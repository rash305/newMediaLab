package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocSignOfDay;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MongoSignOfDayRepository extends MongoRepository<DocSignOfDay, String> {
    Optional<DocSignOfDay> findByUserIdAndAndDay(String userId, LocalDate today);
}
