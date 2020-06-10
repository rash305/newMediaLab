package com.newmedia.deafapi.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newmedia.deafapi.api.ApiApplication;
import com.newmedia.deafapi.api.dataservices.docModels.DocVideoReference;
import com.newmedia.deafapi.api.dtos.VideoDto;
import com.newmedia.deafapi.api.models.VideoReference;
import com.newmedia.deafapi.api.services.fileupload.FileStorageService;
import com.newmedia.deafapi.api.services.smartImage.TranslateService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class VideoController {
    private static final Logger logger = LogManager.getLogger(ApiApplication.class);

    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private TranslateService translateService;

    @PostMapping("/api/videos")
    public VideoDto uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if(file == null){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Video is not received");
        }
        VideoReference videoReference = fileStorageService.storeFile(file);

        return ObjectMapperUtils.map(videoReference, VideoDto.class);
    }

    @GetMapping("/api/videos/{fileName}")
    public ResponseEntity<Resource > downloadFile(@PathVariable String fileName,
                                                  HttpServletRequest request,
                                                  @RequestParam(value = "type", required = false, defaultValue = "application/octet-stream")
                                                              String type) throws IOException, ClassNotFoundException {
        // Load file as Resource
        Resource resource= fileStorageService.loadFileAsResource(fileName);
        if(resource == null){
            logger.info("Video with id of " + fileName + " cannot be found");
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Video not available");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}
