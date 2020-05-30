package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.CategoryDto;
import com.newmedia.deafapi.api.dtos.LearnTaskDto;
import com.newmedia.deafapi.api.models.AuthorizedClient;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.LearnTask;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.services.Interfaces.ILearnTaskService;
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
public class LearnTaskController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ILearnTaskService ILearnTaskService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/learntasks")
    public LearnTaskDto getLearnTask() {

        LearnTask learnTask;
        learnTask = ILearnTaskService.getLearnTask();

        if (learnTask == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Something broke in the learnTask.");
        }

        LearnTaskDto learnTaskDtos = ObjectMapperUtils.map(learnTask, LearnTaskDto.class);
        return learnTaskDtos;
    }
}
