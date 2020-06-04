package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class VideoDto implements Serializable {
    private String videoUrl ;
    private int popularity;
    public VideoDto() {
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
