package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoFavoriteSignRepository extends MongoRepository<DocFavoriteSign, String> {

}