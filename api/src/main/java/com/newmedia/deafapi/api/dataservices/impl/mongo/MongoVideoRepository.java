package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import com.newmedia.deafapi.api.dataservices.docModels.DocVideo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoVideoRepository extends MongoRepository<DocVideo, String> {
}