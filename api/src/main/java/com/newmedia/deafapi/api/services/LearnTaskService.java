package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.models.*;
import com.newmedia.deafapi.api.services.Interfaces.ILearnTaskService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LearnTaskService implements ILearnTaskService {

    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;
    @Autowired
    private MongoSignRepository signISignRepository;
    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;


    private List<Category> getCategories(String acceptLanguage) {
        List<DocCategory> all = categoryICategoryRepository.findByLanguage(acceptLanguage);
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
        List<String> questions = new ArrayList<>();
        for(int i = 0; i<3; i++) {
            Sign[] optionalAnswers = getFourRandomSigns(signs);
            Sign randomQuestion = optionalAnswers[rand.nextInt(optionalAnswers.length)];
            // Make sure a sign can only be learned once per quiz
            while(questions.contains(randomQuestion.getTitle())) {
                randomQuestion = optionalAnswers[rand.nextInt(optionalAnswers.length)];
            }
            questions.add(randomQuestion.getTitle());
            SignDetails question = getSignDetails(randomQuestion.getId());

            // Get to know whether the user already has the question sign in his favorites
            String userId = GetAuthorizedUser();
            boolean isFavorite = favoriteSignRepository.existsBySignIdAndAndPersonIdAndVideoId(question.getId(), userId, question.getVideos().get(0).getId());
            question.getVideos().get(0).setIsFavorite(isFavorite);
            learnSubTasks[i] = new LearnSubTask(question, optionalAnswers);
        }
        return learnSubTasks;
    }

    private String GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            Object principal = authentication.getPrincipal();
            if (principal != null) {
                return principal.toString();
            }
        }
        return null;
    }

    @Override
    public LearnTask getLearnTask(String acceptLanguage) {
        List<Category> categories = this.getCategories(acceptLanguage);
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
