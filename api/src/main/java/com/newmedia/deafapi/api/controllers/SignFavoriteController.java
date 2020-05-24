package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class SignFavoriteController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ISignService ISignService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @PostMapping("/api/signs/favorite")
    public void favoriteSign(@RequestBody SignDto sign) {
        String UserId = GetAuthorizedUser();
        if (UserId == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid user token is given.");
        }
        if (sign == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No valid sign is given.");
        }

        ISignService.favoriteSign(sign.getId(), sign.getCategory().getId(), UserId);


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
