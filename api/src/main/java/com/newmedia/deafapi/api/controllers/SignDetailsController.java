package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.SignDetailsDto;
import com.newmedia.deafapi.api.dtos.VideoDto;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.models.VideoReference;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.services.smartImage.ImageService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.MalformedURLException;
import java.util.List;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class SignDetailsController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ISignService ISignService;

    @Autowired
    private IFavoritesService IFavoritesService;

    @Autowired
    private IImageService IImageService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/signdetails/{id}")
    public SignDetailsDto getSignDetails(@PathVariable("id") String id) {
        SignDetails signDetails = ISignService.getSignDetails(id);
        if(signDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign can be requested.");
        }

        // Get current user
        String userId = GetAuthorizedUser();

        SignDetailsDto signDetailsDto = ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
        // Update popularity and favorite status for each video
        for (VideoDto video: signDetailsDto.getVideos()) {
            // Get all users who have this video of the sign as favorite
            List<String> users = IFavoritesService.getUsersOfFavoriteSign(signDetails.getId(), video.getId());
            video.setPopularity(users.size());
            video.setIsFavorite(users.contains(userId));
        }
        return signDetailsDto;
    }

    @PostMapping("/api/signdetails")
    public SignDetailsDto createSignDetails(@RequestBody SignDetailsDto sign) {
        SignDetails signDetails = ObjectMapperUtils.map(sign, SignDetails.class);
        if(signDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign is given.");
        }

        try {
            String s = IImageService.saveImage(signDetails.getImage());
            signDetails.setImage(s);
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(
                    HttpStatus.I_AM_A_TEAPOT, "");
        }

        // Make title with capital as first letter
        String title = signDetails.getTitle();
        String capTitle = title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();
        signDetails.setTitle(capTitle);

        // check whether sign already exists in the database
        SignDetails duplicate = ISignService.getSignDetails(signDetails.getTitle(), signDetails.getCategory());
        String creatorId = GetAuthorizedUser();
        if(duplicate == null) {
            // Sign is not in the database yet, thus add a new sign
            signDetails.getVideos().get(0).setCreatorId(creatorId);
            signDetails = ISignService.createSignDetails(signDetails);
            return ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
        } else {
            // Sign is already in the database, thus add video to known sign
            VideoReference newVideo = signDetails.getVideos().get(0);
            newVideo.setCreatorId(creatorId);
            duplicate = ISignService.addVideoToSign(duplicate, newVideo);
            return ObjectMapperUtils.map(duplicate, SignDetailsDto.class);
        }
    }

    private String GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            Object principal = authentication.getPrincipal();
            if (principal != null) {
                return principal.toString();
            }
        }
        return null;
    }
}
