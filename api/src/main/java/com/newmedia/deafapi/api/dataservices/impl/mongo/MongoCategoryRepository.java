package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoCategoryRepository extends MongoRepository<DocCategory, String> {
    //
}