package com.newmedia.deafapi.api.dataservices.docModels;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

@Document
public class DocVideo {

    @Id
    private String id;
    private Binary video;

    public DocVideo() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Binary getVideo() {
        return video;
    }

    public void setVideo(Binary video) {
        this.video = video;
    }
}
