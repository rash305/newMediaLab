package com.newmedia.deafapi.api.services.fileupload;

import com.newmedia.deafapi.api.models.VideoReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;


@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
            this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                    .toAbsolutePath().normalize();
            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
            }
    }

    public String storeImage(String imageExtention, BufferedImage image) {
        String fileName = randomFileName() + '.' + imageExtention;

        // Copy file to the target location (Replacing existing file with the same name)
        Path targetLocation = this.fileStorageLocation.resolve("images").resolve(fileName);
        try {
            ImageIO.write(image, imageExtention, new File(targetLocation.toUri()));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        String url = buildUrl(fileName, "images");

        return url;
    }

        public VideoReference storeFile(MultipartFile file) {
        VideoReference videoReference = new VideoReference();
        videoReference.setType(file.getContentType());

        String[] extention = file.getName().split(".");
        String fileName = randomFileName();
        if(extention.length != 0){
            fileName += '.';
            fileName += extention[extention.length - 1];
        }

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Build a Url to retrieve the video
            String url = buildUrl(fileName, "videos");
            videoReference.setVideoUrl(url);


            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return videoReference;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    private String randomFileName() {
        UUID uuid = UUID.randomUUID();
        return StringUtils.cleanPath(String.valueOf(uuid));
    }

    private String buildUrl(String Filename, String fileType){
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/" + fileType + '/')
                .path(Filename)
                .toUriString();

        return fileDownloadUri;
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException | FileNotFoundException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
    }
}
