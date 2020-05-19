package com.newmedia.deafapi.api.dataservices.docModels;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.io.Serializable;

@JsonSerialize
public class DocAccount implements Serializable {

    @Id
    private String id;

    @Indexed(name = "meta_username_account_index_unique", unique = true)
    private String username;
    private String password;

    @Indexed(name = "meta_email_account_index_unique", unique = true)
    private String emailAddress;

    public DocAccount() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
