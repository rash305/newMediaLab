package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class SignDto implements Serializable {
    private String id;
    private String title;
    private String categoryId;

    public SignDto(String id, String title, String categoryId) {
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
    }

    public SignDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
