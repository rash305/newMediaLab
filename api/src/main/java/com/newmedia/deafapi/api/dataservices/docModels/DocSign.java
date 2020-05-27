package com.newmedia.deafapi.api.dataservices.docModels;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class DocSign {

    @Id
    private String id;
    @Indexed(unique = true)
    private String title;
    @DBRef
    private DocCategory category;
    private String image;
    private String video;

    public DocSign() {
    }

    public DocSign(String title) {
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

    public DocCategory getCategory() {
        return category;
    }

    public void setCategory(DocCategory category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }
}
