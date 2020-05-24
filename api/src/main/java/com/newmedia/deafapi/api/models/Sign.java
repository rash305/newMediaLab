package com.newmedia.deafapi.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

public class Sign {

    private String id;
    private String title;
    private Category category;

    public Sign(String id, String title, Category category) {
        this.id = id;
        this.title = title;
        this.category = category;
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
}
