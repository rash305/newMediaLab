package com.newmedia.deafapi.api.models;

import java.util.List;

public class SignDetails {

    private String id;
    private String title;
    private Category category;
    private String image;
    private List<VideoReference> videos;

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

    public List<VideoReference> getVideos() {
        return videos;
    }

    public void setVideos(List<VideoReference> videos) {
        this.videos = videos;
    }

    public void addVideo(List<VideoReference> videos) {
        for(VideoReference video: videos) {
            this.videos.add(video);
        }
    }
}
