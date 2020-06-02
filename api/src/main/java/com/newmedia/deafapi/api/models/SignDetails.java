package com.newmedia.deafapi.api.models;

public class SignDetails {

    private String id;
    private String title;
    private Category category;
    private String image;
    private String video;
    private boolean isPersonal;

    public SignDetails(String id, String title, Category category, String image, String video) {
        this.id = id;
        this.title = title;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
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

    public boolean getIsPersonal() {
        return isPersonal;
    }

    public void setIsPersonal(boolean isPersonal) {
        this.isPersonal = isPersonal;
    }
}
