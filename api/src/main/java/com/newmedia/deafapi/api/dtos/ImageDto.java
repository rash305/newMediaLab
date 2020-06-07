package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class ImageDto implements Serializable {
    private String imageUrl;

    public ImageDto(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
