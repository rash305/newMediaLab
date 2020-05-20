package com.newmedia.deafapi.api.dataservices.docModels;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class DocSign {

    @Id
    private String id;
    @Indexed(unique = true)
    private String title;
    private String categoryId;
    private String category;
    private String image;
    private String video;

    public DocSign() {
    }

    public DocSign(String id, String title, String categoryId,
                   String category, String image, String video) {
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
        this.category = category;
        this.image = image;
        this.video = video;
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

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
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
