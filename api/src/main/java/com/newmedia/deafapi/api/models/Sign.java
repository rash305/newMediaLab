package com.newmedia.deafapi.api.models;

public class Sign {

    private String id;
    private String title;

    public Sign(String id, String title) {
        this.id = id;
        this.title = title;
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
}
