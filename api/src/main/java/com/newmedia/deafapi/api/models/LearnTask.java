package com.newmedia.deafapi.api.models;

public class LearnTask {

    private LearnSubTask[] learnTasks;

    public LearnTask(LearnSubTask[] learnTasks) {
        this.learnTasks = learnTasks;
    }

    public LearnSubTask[] getLearnTasks() {
        return learnTasks;
    }

    public void setLearnTasks(LearnSubTask[] learnTasks) {
        this.learnTasks = learnTasks;
    }
}
