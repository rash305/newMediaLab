package com.newmedia.deafapi.api.models;

public class SignDetails {

    private String id;
    private String title;
    private String categoryId;
    private String category;
    private String image;
    private String video;

    public SignDetails(String id, String title, String categoryId,
                       String category, String image, String video) {
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
        this.category = category;
        this.image = image;
        this.video = video;
    }

    public SignDetails() {
    }

    public SignDetails(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
