package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.AccountDto;
import com.newmedia.deafapi.api.models.Account;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class AccountController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private IAccountService accountService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @PostMapping("/api/accounts")
    public AccountDto createSign(@RequestBody AccountDto accountDto) {
        Account accountModel = ObjectMapperUtils.map(accountDto, Account.class);

        if(accountModel == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No account is provided.");
        }

        if(accountModel.getEmailAddress() == null
        || accountModel.getEmailAddress().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No email address is provided.");
        }

        if(accountModel.getUsername() == null
        || accountModel.getUsername().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No username is provided.");
        }

        accountModel = accountService.createAccount(accountModel);
        return ObjectMapperUtils.map(accountModel, AccountDto.class);
    }
}
