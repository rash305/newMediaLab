package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocVideoReference;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoVideoRepository extends MongoRepository<DocVideoReference, String> {
}