package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.models.*;
import com.newmedia.deafapi.api.services.Interfaces.ILearnTaskService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class LearnTaskService implements ILearnTaskService {

    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;
    @Autowired
    private MongoSignRepository signISignRepository;

    private List<Category> getCategories() {
        List<DocCategory> all = categoryICategoryRepository.findAll();
        return ObjectMapperUtils.mapAll(all, Category.class);
    }

    private List<Sign> getSigns(String categoryId) {
        List<DocSign> all = signISignRepository.findByCategoryId(categoryId);
        return ObjectMapperUtils.mapAll(all, Sign.class);
    }

    private Sign[] getFourRandomSigns(List<Sign> signs) {
        Collections.shuffle(signs);
        List<Sign> fourSigns = signs.subList(0,4);
        return fourSigns.toArray(new Sign[fourSigns.size()]);
    }

    private SignDetails getSignDetails(String id) {
        Optional<DocSign> s = signISignRepository.findById(id);
        return ObjectMapperUtils.map(s.get(), SignDetails.class);
    }

    private LearnSubTask[] getLearnSubTasks(List<Sign> signs) {
        LearnSubTask[] learnSubTasks = new LearnSubTask[3];
        Random rand = new Random();
        for(int i = 0; i<3; i++) {
            Sign[] optionalAnswers = getFourRandomSigns(signs);
            Sign randomQuestion = optionalAnswers[rand.nextInt(optionalAnswers.length)];
            SignDetails question = getSignDetails(randomQuestion.getId());
            learnSubTasks[i] = new LearnSubTask(question, optionalAnswers);
        }
        return learnSubTasks;
    }

    @Override
    public LearnTask getLearnTask() {
        List<Category> categories = this.getCategories();
        Random rand = new Random();
        Category randomCat = categories.get(rand.nextInt(categories.size()));
        List<Sign> signs = this.getSigns(randomCat.getId());
        // Check if there are enough signs in the category to do a quiz
        // Else pick another random category
        while(signs.size() < 4) {
            randomCat = categories.get(rand.nextInt(categories.size()));
            signs = this.getSigns(randomCat.getId());
        }
        LearnSubTask[] learnSubTasks = this.getLearnSubTasks(signs);
        LearnTask learnTask = new LearnTask(learnSubTasks);
        return learnTask;
    }
}