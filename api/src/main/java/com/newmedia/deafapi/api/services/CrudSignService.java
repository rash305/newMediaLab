package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudSignService implements ISignService {

    @Autowired
    private MongoSignRepository signISignRepository;
    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;

    @Override
    public List<Sign> getSigns() {
        return new ArrayList( signISignRepository.findAll());
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
    public void favoriteSign(String signId, String CategoryId, String userId) {
        DocFavoriteSign probe = new DocFavoriteSign();
        probe.setSignId(signId);
        probe.setCategoryId(CategoryId);
        probe.setPersonId(userId);
        favoriteSignRepository.save(probe);
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
