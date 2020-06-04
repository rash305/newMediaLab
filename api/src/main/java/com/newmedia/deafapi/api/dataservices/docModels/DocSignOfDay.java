package com.newmedia.deafapi.api.dataservices.docModels;

import java.time.LocalDate;

public class DocSignOfDay {
    private String signId;
    private String userId;
    private LocalDate day;

    public DocSignOfDay(String signId, String userId, LocalDate day) {
        this.signId = signId;
        this.userId = userId;
        this.day = day;
    }

    public String getSignId() {
        return signId;
    }

    public void setSignId(String signId) {
        this.signId = signId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getDay() {
        return day;
    }

    public void setDay(LocalDate day) {
        this.day = day;
    }
}
