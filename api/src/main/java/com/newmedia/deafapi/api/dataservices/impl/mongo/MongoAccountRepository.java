package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoAccountRepository extends MongoRepository<DocAccount, String> {
    //
}