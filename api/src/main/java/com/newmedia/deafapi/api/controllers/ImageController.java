package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.ImageDto;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class ImageController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private IImageService IImageService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/image")
    public ImageDto getSignImage(@RequestParam(value = "imageNumber", required = false) int imageNumber,
                               @RequestParam(value = "signTitle") String signTitle,
                               @RequestParam(value = "signCategory") String signCategory) throws Exception {
        String imageUrl = IImageService.getSignImage(imageNumber, signTitle, signCategory, "");
        ImageDto imageDto = new ImageDto(imageUrl);
        return imageDto;
    }
}
