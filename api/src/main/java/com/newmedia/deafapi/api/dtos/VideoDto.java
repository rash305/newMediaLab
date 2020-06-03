package com.newmedia.deafapi.api.dtos;

import java.io.Serializable;

public class VideoDto implements Serializable {
    private Object video;

    public VideoDto() {
    }

    public Object getVideo() {
        return video;
    }

    public void setVideo(Object video) {
        this.video = video;
    }
}
