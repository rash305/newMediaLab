package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
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
    public void favoriteSign(@RequestBody SignDto sign) {
        if (sign == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid sign is given.");
        }
        String UserId = GetAuthorizedUser();
        // Get all users who have this sign as favorite
        List<String> users = IFavoritesService.getUsersOfFavoriteSign(sign.getId());
        // Add sign to users favorite when user is does not have it as favorites yet
        if (!users.contains(UserId)) {
            IFavoritesService.favoriteSign(sign.getId(), sign.getCategory().getId(), UserId);
        }
    }

    @PostMapping("/api/signs/unfavorite")
    public void unFavoriteSign(@RequestBody SignDto sign) {
        String UserId = GetAuthorizedUser();
        if (UserId == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid user token is given.");
        }
        if (sign == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid sign is given.");
        }

        IFavoritesService.unFavoriteSign(sign.getId(), UserId);
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
