package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocSign;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MongoSignRepository extends MongoRepository<DocSign, String> {
    List<DocSign> findByCategoryId(String categoryId);

    @Query(value = "{'title': {$regex : ?0, $options: 'i'}}")
    List<DocSign> findByTitleRegex(String regex);
}