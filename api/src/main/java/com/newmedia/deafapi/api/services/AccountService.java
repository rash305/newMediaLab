package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoAccountRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.models.Account;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.utils.CustomError;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// By notating this class as service it is possible to autowire this class
@Service
public class AccountService implements IAccountService {

    @Autowired
    private MongoAccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Account createAccount(Account account) {
        if (account.getPassword() != null){
            hashPassword(account);
        }

        DocAccount a = ObjectMapperUtils.map(account, DocAccount.class);
        accountRepository.insert(a);
        // return category with ID
        return ObjectMapperUtils.map(a, Account.class);
    }

    private void hashPassword(Account account){
        account.setPassword(passwordEncoder.encode(account.getPassword()));
    }
}
