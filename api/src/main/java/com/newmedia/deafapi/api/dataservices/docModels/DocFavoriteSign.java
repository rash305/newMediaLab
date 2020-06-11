package com.newmedia.deafapi.api.dataservices.docModels;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.io.Serializable;

@JsonSerialize
public class DocFavoriteSign implements Serializable {

    @Id
    private String id;
    @Indexed()
    private String signId;
    @Indexed()
    private String categoryId;
    //Supports device tokens and account id as Id
    @Indexed()
    private String personId;
    @Indexed()
    private String videoId;

    public DocFavoriteSign() {
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
