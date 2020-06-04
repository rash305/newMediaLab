package com.newmedia.deafapi.api.models;

public class VideoReference {
    private String videoUrl ;
    private int popularity;

    public VideoReference() {

    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }
}
