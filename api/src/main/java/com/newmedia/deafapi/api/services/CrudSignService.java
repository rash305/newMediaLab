package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.docModels.DocVideoReference;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoVideoRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.models.VideoReference;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudSignService implements ISignService {

    @Autowired
    private MongoSignRepository signISignRepository;

    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;

    @Autowired
    private MongoVideoRepository videoRepository;

    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;

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
    public List<Sign> getSearchedSigns(String searchTerm, String acceptLanguage) {
        List<DocSign> allResults = signISignRepository.findByTitleRegex(searchTerm);

        List<DocSign> correctResults = allResults.stream()
                .filter(result ->
                        result.getCategory().getLanguage().equals(acceptLanguage))
                .collect(Collectors.toList());
        return ObjectMapperUtils.mapAll(correctResults, Sign.class);
    }

    private List<Category> getCategories(String acceptLanguage) {
        List<DocCategory> all = categoryICategoryRepository.findByLanguage(acceptLanguage);
        return ObjectMapperUtils.mapAll(all, Category.class);
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
        // return sign with ID
        return ObjectMapperUtils.map(s, Sign.class);
    }

    @Override
    public SignDetails createSignDetails(SignDetails sign) {
        DocSign s = ObjectMapperUtils.map(sign, DocSign.class);
        for (DocVideoReference doc : s.getVideos()){
            videoRepository.save(doc);
        }

        signISignRepository.insert(s);
        // return signDetail with ID
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

    @Override
    public SignDetails getSignDetails(String title, Category category) {
        DocCategory docCategory = ObjectMapperUtils.map(category, DocCategory.class);
        Optional<DocSign> s = signISignRepository.findByTitleAndCategory(title, docCategory);
        if(s.isPresent()) {
            return ObjectMapperUtils.map(s.get(), SignDetails.class);
        }
        else {
            return null;
        }
    }

    @Override
    public SignDetails addVideoToSign(SignDetails duplicate, VideoReference video) {
        DocVideoReference docVideoReference = ObjectMapperUtils.map(video, DocVideoReference.class);
        DocSign docDuplicate = ObjectMapperUtils.map(duplicate, DocSign.class);
        for (DocVideoReference doc : docDuplicate.getVideos()){
            videoRepository.save(doc);
        }
        docDuplicate.addVideo(docVideoReference);
        videoRepository.insert(docVideoReference);
        signISignRepository.save(docDuplicate);
        // return updated signDetails with ID
        return ObjectMapperUtils.map(docDuplicate, SignDetails.class);
    }
}
