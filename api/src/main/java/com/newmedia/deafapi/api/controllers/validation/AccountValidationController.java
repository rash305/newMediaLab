package com.newmedia.deafapi.api.controllers.validation;

import com.newmedia.deafapi.api.dtos.AccountDto;
import com.newmedia.deafapi.api.models.Account;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class AccountValidationController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private IAccountService accountService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @PostMapping("/api/validation/account/email")
    public boolean checkEmail(@RequestBody String email) {
        if(email == null || email.isEmpty()){
            return false;
        }

        return accountService.isEmailAvailable(email);
    }

    @PostMapping("/api/validation/account/username")
    public boolean checkUsername(@RequestBody String username) {
        if(username == null || username.isEmpty()){
            return false;
        }

        return accountService.isUsernameAvailable(username);
    }
}
