package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.docModels.DocSignOfDay;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignOfDayRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ISignOfDayService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class SignOfDayService implements ISignOfDayService {

    @Autowired
    private MongoSignOfDayRepository signOfDayRepository;
    @Autowired
    private MongoSignRepository signRepository;
    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;

    @Override
    public Sign getSignOfDay(String userId, LocalDate today, String acceptLanguage) {
        Optional<DocSignOfDay> signOfDay = signOfDayRepository.findByUserIdAndAndDay(userId, today);
        String signId;
        // Check whether a sign exists for that day for the user
        if(signOfDay.isPresent()) {
            // User has a sign of that day
            // Thus return the sign
            signId = signOfDay.get().getSignId();
            DocSign sign = signRepository.findById(signId).get();
            return ObjectMapperUtils.map(sign, Sign.class);
        }
        else {
            // User has no sign of that day
            // Thus create one for that day
            return createSignOfDay(userId, today, acceptLanguage);
        }
    }

    @Override
    public Sign createSignOfDay(String userId, LocalDate today, String acceptLanguage) {
        // Get categories of given language
        List<Category> categories = getCategories(acceptLanguage);
        // Select a random category
        Random rand = new Random();
        Category randomCat = categories.get(rand.nextInt(categories.size()));
        // Get all signs for language
        List<DocSign> allSigns = signRepository.findByCategoryId(randomCat.getId());
        DocSign sign = allSigns.get(rand.nextInt(allSigns.size()));

        // Save the newly generated sign of the day in the database
        DocSignOfDay signOfDay = new DocSignOfDay(sign.getId(), userId, today);
        signOfDayRepository.insert(signOfDay);

        return ObjectMapperUtils.map(sign, Sign.class);
    }

    private List<Category> getCategories(String acceptLanguage) {
        List<DocCategory> all = categoryICategoryRepository.findByLanguage(acceptLanguage);
        return ObjectMapperUtils.mapAll(all, Category.class);
    }
}
