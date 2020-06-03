package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class FavoriteSignDto implements Serializable {

    private String id;
    private String signId;
    private String categoryId;
    private String personId;

    public FavoriteSignDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSignId() {
        return signId;
    }

    public void setSignId(String signId) {
        this.signId = signId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }
}
