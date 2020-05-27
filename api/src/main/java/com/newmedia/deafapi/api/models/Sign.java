package com.newmedia.deafapi.api.models;

public class Sign {

    private String id;
    private String title;
    private Category category;
    private String image;

    public Sign(String id, String title, Category category, String image) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.image = image;
    }

    public Sign() {
    }

    public Sign(String title) {
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
}
