package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class SignDetailsDto implements Serializable {
    private String id;
    private String title;
    private String category;
    private String categoryId;
    private String image;
    private String video;

    public SignDetailsDto(String id, String title, String categoryId) {
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
    }

    public SignDetailsDto() {
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


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
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
