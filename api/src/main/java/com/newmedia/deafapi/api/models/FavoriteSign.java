package com.newmedia.deafapi.api.models;

public class FavoriteSign {

    private String id;
    private String signId;
    private String categoryId;
    private String personId;
    private String videoId;

    public FavoriteSign() {
    }

    public FavoriteSign(String id, String signId, String categoryId,
                        String personId, String videoId) {
        this.id = id;
        this.signId = signId;
        this.categoryId = categoryId;
        this.personId = personId;
        this.videoId = videoId;
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

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
}
