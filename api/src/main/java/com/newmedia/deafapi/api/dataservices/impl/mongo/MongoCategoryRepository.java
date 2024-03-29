package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MongoCategoryRepository extends MongoRepository<DocCategory, String> {
    List<DocCategory> findByLanguage(String language);

    //
}