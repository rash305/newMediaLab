package com.newmedia.deafapi.api.models;

public class LearnSubTask {

    private SignDetails question;
    private Sign[] optionalAnswers;

    public LearnSubTask(SignDetails question, Sign[] optionalAnswers) {
        this.question = question;
        this.optionalAnswers = optionalAnswers;
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
