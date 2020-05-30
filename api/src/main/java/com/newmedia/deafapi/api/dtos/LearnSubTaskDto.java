package com.newmedia.deafapi.api.dtos;

import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;

public class LearnSubTaskDto {

    private SignDetails question;
    private Sign[] optionalAnswers;


    public LearnSubTaskDto() {

    }

    public SignDetails getQuestion() {
        return this.question;
    }

    public Sign[] getOptionalAnswers() {
        return this.optionalAnswers;
    }

    public void setQuestion(SignDetails question) {
        this.question = question;
    }

    public void setOptionalAnswers(Sign[] optionalAnswers) {
        this.optionalAnswers = optionalAnswers;
    }

}
