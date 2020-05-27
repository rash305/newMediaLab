package com.newmedia.deafapi.api.dataservices.docModels;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.io.Serializable;

@JsonSerialize
public class DocFavoriteSign implements Serializable {

    @Id
    private String id;
    @Indexed()
    private String SignId;
    @Indexed()
    private String CategoryId;
    //Supports device tokens and account id as Id
    @Indexed()
    private String PersonId;

    public DocFavoriteSign() {
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
