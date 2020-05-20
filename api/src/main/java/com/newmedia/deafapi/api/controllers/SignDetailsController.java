package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.SignDetailsDto;
import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/signdetails/{id}")
    public SignDetailsDto getSignDetails(@PathVariable("id") String id) {
        SignDetails signDetails = ISignService.getSignDetails(id);
        if(signDetails == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign can be requested.");
        }

        SignDetailsDto signDetailsDto = ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
        return signDetailsDto;
    }


    @PostMapping("/api/signdetails")
    public SignDetailsDto createSignDetails(@RequestBody SignDetailsDto sign) {
        SignDetails signDetails = ObjectMapperUtils.map(sign, SignDetails.class);
        if(signDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No sign is given.");
        }
        signDetails = ISignService.createSignDetails(signDetails);
        return ObjectMapperUtils.map(signDetails, SignDetailsDto.class);
    }
}
