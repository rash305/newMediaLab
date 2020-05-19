package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.CategoryDto;
import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class SignController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ISignService ISignService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/signs")
    public List<SignDto> getSignList() {
        List<Sign> signs = ISignService.getSigns();
        if(signs == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No signs can be requested.");
        }

        List<SignDto> signDtos = ObjectMapperUtils.mapAll(signs, SignDto.class);
        return signDtos;
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
}
