package com.newmedia.deafapi.api.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.io.Serializable;

public class FavoriteSignDto implements Serializable {

    private String id;
    private String SignId;
    private String CategoryId;
    private String PersonId;

    public FavoriteSignDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSignId() {
        return SignId;
    }

    public void setSignId(String signId) {
        SignId = signId;
    }

    public String getCategoryId() {
        return CategoryId;
    }

    public void setCategoryId(String categoryId) {
        CategoryId = categoryId;
    }

    public String getPersonId() {
        return PersonId;
    }

    public void setPersonId(String personId) {
        PersonId = personId;
    }
}
