package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.SignDetailsDto;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/signdetails/{id}")
    public SignDetailsDto getSignDetails(@PathVariable("id") String id) {
        SignDetails signDetails = ISignService.getSignDetails(id);
        if(signDetails == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign can be requested.");
        }
        
        // Get all users who have this sign as favorite
        List<String> users = IFavoritesService.getUsersOfFavoriteSign(signDetails.getId());
        String UserId = GetAuthorizedUser();

        SignDetailsDto signDetailsDto = ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
        signDetailsDto.setNrOfPersonal(users.size());
        signDetailsDto.setIsPersonal(users.contains(UserId));
        return signDetailsDto;
    }


    @PostMapping("/api/signdetails/create")
    public SignDetailsDto createSignDetails(@RequestBody SignDetailsDto sign) {
        SignDetails signDetails = ObjectMapperUtils.map(sign, SignDetails.class);
        if(signDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign is given.");
        }

        // Make title with capital as first letter
        String title = signDetails.getTitle();
        String capTitle = title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();
        signDetails.setTitle(capTitle);

        // check whether sign already exists in the database
        SignDetails duplicate = ISignService.getSignDetails(signDetails.getTitle(), signDetails.getCategory());
        if(duplicate == null) {
            // Sign is not in the database yet, thus add a new sign
            String creator_id = GetAuthorizedUser();
            signDetails.setCreator_id(creator_id);

            signDetails = ISignService.createSignDetails(signDetails);
            return ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
        } else {
            // Sign is already in the database, thus add video to known sign
            duplicate = ISignService.addVideoToSign(duplicate, signDetails.getVideos());
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
