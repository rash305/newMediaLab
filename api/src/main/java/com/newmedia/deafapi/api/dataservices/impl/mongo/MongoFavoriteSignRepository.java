package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MongoFavoriteSignRepository extends MongoRepository<DocFavoriteSign, String> {
    List<DocFavoriteSign> findBySignIdAndVideoId(String signId, String videoId);
    boolean existsBySignIdAndAndPersonId(String signId, String personId);
    void deleteBySignIdAndAndPersonId(String signId, String personId);
}