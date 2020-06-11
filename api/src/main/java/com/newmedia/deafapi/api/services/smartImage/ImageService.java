package com.newmedia.deafapi.api.services.smartImage;

import com.flickr4java.flickr.FlickrException;
import com.newmedia.deafapi.api.dataservices.docModels.DocTranslatedWord;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoTranslationRepository;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

// By notating this class as service it is possible to autowire this class
@Service
public class ImageService implements IImageService {

    @Autowired
    private SmartImageSearchService service;
    @Autowired
    private TranslateService translateService;
    @Autowired
    private MongoTranslationRepository translateTranslationRepository;

    @Autowired
    public ImageService(SmartImageSearchService service, TranslateService translateService, MongoTranslationRepository translateTranslationRepository) {
        this.service = service;
        this.translateService = translateService;
        this.translateTranslationRepository = translateTranslationRepository;


    }

    @Override
    public String getSignImage(int imageNumber, String signTitle, String signCategory, String language) throws Exception {
        try {
            String originalTitle = signTitle.toLowerCase();
            String englishTitle;
            Optional<DocTranslatedWord> translation = translateTranslationRepository.findFirstByWordAndLanguage(originalTitle, language);
            if (translation.isPresent()) {
                englishTitle = translation.get().getEnglishTranslation();
            } else{
                englishTitle = translateService.getTranslation(signTitle, language);
                DocTranslatedWord translatedWord = new DocTranslatedWord();
                translatedWord.setEnglishTranslation(englishTitle);
                translatedWord.setWord(originalTitle);
                translatedWord.setLanguage(language);
                translateTranslationRepository.insert(translatedWord);
            }

            String searchTerm =  englishTitle;
            return service.getImage(searchTerm, imageNumber);
        } catch (Exception e) {
           throw new Exception("Image cannot be found");
        }

    }
}
