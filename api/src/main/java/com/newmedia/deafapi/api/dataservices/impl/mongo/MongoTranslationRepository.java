package com.newmedia.deafapi.api.dataservices.impl.mongo;

import com.newmedia.deafapi.api.dataservices.docModels.DocAccount;
import com.newmedia.deafapi.api.dataservices.docModels.DocSignOfDay;
import com.newmedia.deafapi.api.dataservices.docModels.DocTranslatedWord;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MongoTranslationRepository extends MongoRepository<DocTranslatedWord, String> {
    Optional<DocTranslatedWord> findByWordAndLanguage(String word, String language);

}