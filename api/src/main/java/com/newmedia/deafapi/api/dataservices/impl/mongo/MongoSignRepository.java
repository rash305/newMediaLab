package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoSignRepository extends MongoRepository<DocSign, String> {
    //
}