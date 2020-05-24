package com.newmedia.deafapi.api.dtos;

import com.newmedia.deafapi.api.models.Category;

import java.io.Serializable;

public class SignDto implements Serializable {
    private String id;
    private String title;
    private CategoryDto category;

    public SignDto(String id, String title, CategoryDto category) {
        this.id = id;
        this.title = title;
        this.category = category;
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

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }
}
