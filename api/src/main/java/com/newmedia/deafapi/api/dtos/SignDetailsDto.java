package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class SignDetailsDto implements Serializable {
    private String id;
    private String title;
    private CategoryDto category;
    private String image;
    private String video;

    public SignDetailsDto(String id, String title, CategoryDto category,
                          String image, String video) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.image = image;
        this.video = video;
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

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }
}
