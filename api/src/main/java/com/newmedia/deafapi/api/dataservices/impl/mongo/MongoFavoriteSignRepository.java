package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.print.Doc;
import java.util.List;

public interface MongoFavoriteSignRepository extends MongoRepository<DocFavoriteSign, String> {
    List<DocFavoriteSign> findBySignId(String signId);
    void deleteBySignIdAndAndPersonId(String signId, String personId);
}