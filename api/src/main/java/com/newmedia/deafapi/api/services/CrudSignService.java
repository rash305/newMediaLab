package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoSignRepository;
import com.newmedia.deafapi.api.dataservices.interfaces.ISignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
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
    public void updateSign(Sign sign) {

    }

    @Override
    public Sign getSignDetails(String id) {
        Optional<DocSign> s = signISignRepository.findById(id);
        if(s.isPresent()) {
            return ObjectMapperUtils.map(s.get(), Sign.class);
        }
        else {
            return null;
        }
    }
}
