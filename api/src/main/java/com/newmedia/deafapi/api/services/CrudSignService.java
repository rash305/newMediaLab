package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudSignService implements ISignService {

    @Autowired
    private MongoSignRepository signISignRepository;
    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;
    @Autowired
    private MongoCategoryRepository categoryRepository;
    @Override
    public List<Sign> getSigns(String categoryId) {
        List<DocSign> all;

        if(categoryId == null){
            all = signISignRepository.findAll();
        } else {
            all = signISignRepository.findByCategoryId(categoryId);
        }
        return ObjectMapperUtils.mapAll(all, Sign.class);
    }

    @Override
    public List<Sign> getPersonalSigns(String userId, String categoryId) {
        List<String> signIds = getPersonalSignIds(userId, categoryId);
        Iterable<DocSign> allById = signISignRepository.findAllById(signIds);
        // Map iterable to a list
        List<DocSign> docCategories = StreamSupport.stream(allById.spliterator(), false)
                .collect(Collectors.toList());
        return ObjectMapperUtils.mapAll(docCategories, Sign.class);
    }

    @Override
    public List<Sign> getSearchedSigns(String searchTerm) {
        List<DocSign> s = signISignRepository.findByTitle(searchTerm);
        return ObjectMapperUtils.mapAll(s, Sign.class);
    }

    private List<String> getPersonalSignIds(String userid, String categoryId) {
        // Create terms how to match the example with the objects in database
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id");
        // Example object
        DocFavoriteSign probe = new DocFavoriteSign();
        probe.setPersonId(userid);
        if(categoryId != null){
            probe.setCategoryId(categoryId);
        }
        // Create the example with matcher and example object
        Example<DocFavoriteSign> example = Example.of(probe, modelMatcher);
        List<DocFavoriteSign> s = favoriteSignRepository.findAll(example);
        // Create a list of string of the categoryId only
        return s.stream().map(DocFavoriteSign::getSignId).collect(Collectors.toList());
    }

    @Override
    public Sign createSign(Sign sign) {
        DocSign s = ObjectMapperUtils.map(sign, DocSign.class);
        signISignRepository.insert(s);
        // return category with ID
        return ObjectMapperUtils.map(s, Sign.class);
    }

    @Override
    public SignDetails createSignDetails(SignDetails sign) {
        DocSign s = ObjectMapperUtils.map(sign, DocSign.class);
        signISignRepository.insert(s);
        // return category with ID
        return ObjectMapperUtils.map(s, SignDetails.class);
    }

    @Override
    public void updateSign(Sign sign) {

    }

    @Override
    public SignDetails getSignDetails(String id) {
        Optional<DocSign> s = signISignRepository.findById(id);
        if(s.isPresent()) {
            return ObjectMapperUtils.map(s.get(), SignDetails.class);
        }
        else {
            return null;
        }
    }
}
