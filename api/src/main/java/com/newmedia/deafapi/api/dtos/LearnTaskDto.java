package com.newmedia.deafapi.api.dtos;

import com.newmedia.deafapi.api.models.LearnSubTask;

public class LearnTaskDto {

    private LearnSubTaskDto[] learnTasks;

    public LearnTaskDto() {
    }

    public LearnSubTaskDto[] getLearnTasks() {
        return learnTasks;
    }

    public void setLearnTasks(LearnSubTaskDto[] learnTasks) {
        this.learnTasks = learnTasks;
    }
}
