package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoAccountRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.models.Account;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.utils.CustomError;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

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

    @Override
    public Account getAccountByUsername(String username_or_email) {
        DocAccount account = accountRepository.findByUsername(username_or_email);
        if (account == null){
            account = accountRepository.findByEmailAddress(username_or_email);
        }
        return ObjectMapperUtils.map(account, Account.class);
    }

    @Override
    public boolean isEmailAvailable(String email) {
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("email", ignoreCase());
        DocAccount probe = new DocAccount();
        probe.setEmailAddress(email);
        Example<DocAccount> example = Example.of(probe, modelMatcher);
        return !accountRepository.exists(example);
    }

    @Override
    public boolean isUsernameAvailable(String username) {
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("username", ignoreCase());
        DocAccount probe = new DocAccount();
        probe.setUsername(username);
        Example<DocAccount> example = Example.of(probe, modelMatcher);
        return !accountRepository.exists(example);
    }

    private void hashPassword(Account account){
        account.setPassword(passwordEncoder.encode(account.getPassword()));
    }

    @Override
    public UserDetails loadUserByUsername(String username_or_email) throws UsernameNotFoundException {
        DocAccount account = accountRepository.findByUsername(username_or_email);
        if (account == null){
            account = accountRepository.findByEmailAddress(username_or_email);
        }
        if (account == null) {
            throw new UsernameNotFoundException(username_or_email);
        }
        return new User(account.getUsername(), account.getPassword(), emptyList());
    }
}
