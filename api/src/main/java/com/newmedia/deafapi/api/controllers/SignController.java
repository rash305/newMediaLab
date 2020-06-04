package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.CategoryDto;
import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ISignOfDayService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class SignController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ISignService ISignService;
    @Autowired
    private ISignOfDayService ISignOfDayService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/signs")
    public List<SignDto> getSignList(@RequestParam( value = "category", required = false) String categoryId, @RequestParam(required = false) boolean personal) {
        List<Sign> signs;

        if(personal) {
            String userId = GetAuthorizedUser();
            if (userId == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No valid user token is given.");
            }
            signs = ISignService.getPersonalSigns(userId, categoryId);
        } else {
            signs = ISignService.getSigns(categoryId);
        }

        if(signs == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No signs can be requested.");
        }

        List<SignDto> signDtos = ObjectMapperUtils.mapAll(signs, SignDto.class);
        return signDtos;
    }

    @GetMapping("/api/signs/search")
    public List<SignDto> getSearchedSignList(@RequestParam( value = "searchTerm") String searchTerm) {
        List<Sign> signs;

        signs = ISignService.getSearchedSigns(searchTerm);

        List<SignDto> signDtos = ObjectMapperUtils.mapAll(signs, SignDto.class);
        return signDtos;
    }

    @GetMapping("/api/signs/sign-of-day")
    public SignDto getSignOfDay() {
        String userId = GetAuthorizedUser();
        LocalDate today = LocalDate.now();
        Sign sign = ISignOfDayService.getSignOfDay(userId, today);

        SignDto signDto = ObjectMapperUtils.map(sign, SignDto.class);
        return signDto;
    }


    @PostMapping("/api/signs")
    public SignDto createSign(@RequestBody SignDto sign) {
        Sign signModel = ObjectMapperUtils.map(sign, Sign.class);
        if(signModel == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign is given.");
        }
        signModel = ISignService.createSign(signModel);
        return ObjectMapperUtils.map(signModel, SignDto.class);
    }

    private String GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            Object principal = authentication.getPrincipal();
            if(principal != null){
                return principal.toString();
            }

        }
        return null;
    }
}
