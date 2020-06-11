package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.FavoriteSignDto;
import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.models.FavoriteSign;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
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
public class SignFavoriteController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private IFavoritesService IFavoritesService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @PostMapping("/api/signs/favorite")
    public void favoriteSign(@RequestBody FavoriteSignDto favSignDto) {
        FavoriteSign favSign = ObjectMapperUtils.map(favSignDto, FavoriteSign.class);
        if (favSign == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid sign is given.");
        }
        String userId = GetAuthorizedUser();
        // Get all users who have this sign as favorite
        List<String> users = IFavoritesService.getUsersOfFavoriteSign(favSign.getId(), favSign.getVideoId());
        // Add sign to users favorite when user is does not have it as favorites yet
        if (!users.contains(userId)) {
            favSign.setPersonId(userId);
            IFavoritesService.favoriteSign(favSign);
        }
    }

    @PostMapping("/api/signs/unfavorite")
    public void unFavoriteSign(@RequestBody FavoriteSignDto favSignDto) {
        FavoriteSign favSign = ObjectMapperUtils.map(favSignDto, FavoriteSign.class);
        if (favSign == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid sign is given.");
        }
        String userId = GetAuthorizedUser();
        favSign.setPersonId(userId);
        IFavoritesService.unFavoriteSign(favSign);
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
