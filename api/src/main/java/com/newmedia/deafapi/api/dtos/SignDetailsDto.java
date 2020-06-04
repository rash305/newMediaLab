package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;
import java.util.List;

public class SignDetailsDto implements Serializable {
    private String id;
    private String title;
    private CategoryDto category;
    private String image;
    private List<VideoDto> videos;
    private boolean isPersonal;
    private int nrOfPersonal;

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

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<VideoDto> getVideos() {
        return videos;
    }

    public void setVideos(List<VideoDto> videos) {
        this.videos = videos;
    }

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }

    public boolean getIsPersonal() {
        return isPersonal;
    }

    public void setIsPersonal(boolean isPersonal) {
        this.isPersonal = isPersonal;
    }

    public int getNrOfPersonal() {
        return nrOfPersonal;
    }

    public void setNrOfPersonal(int nrOfPersonal) {
        this.nrOfPersonal = nrOfPersonal;
    }
}
