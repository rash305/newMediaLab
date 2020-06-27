package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.ApiApplication;
import com.newmedia.deafapi.api.dtos.ImageDto;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import com.newmedia.deafapi.api.services.fileupload.FileStorageService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class ImageController {

    private static final Logger logger = LogManager.getLogger(ApiApplication.class);

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private IImageService IImageService;

    @Autowired
    private FileStorageService fileStorageService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/images")
    public ImageDto getSignImage(@RequestParam(value = "imageNumber", required = false) int imageNumber,
                                 @RequestParam(value = "signTitle") String signTitle,
                                 @RequestParam(value = "signCategory") String signCategory,
                                 @RequestHeader(value="Accept-Language") String acceptLanguage) throws Exception {
        String imageUrl = IImageService.getSignImage(imageNumber, signTitle, signCategory, acceptLanguage);
        ImageDto imageDto = new ImageDto(imageUrl);
        return imageDto;
    }

    @GetMapping("/api/images/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
                                                 HttpServletRequest request) throws IOException, ClassNotFoundException {
        // Load file as Resource
        Resource resource= fileStorageService.loadFileAsResource("images/" + fileName);
        if(resource == null){
            logger.info("Image with id of " + fileName + " cannot be found");
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Image not available");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}
