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

    @Override
    public String getSignImage(int imageNumber, String signTitle, String signCategory, String language) throws Exception {
        try {
            String englishTitle;
            Optional<DocTranslatedWord> translation = translateTranslationRepository.findByWordAndLanguage(signTitle, language);
            if (translation.isPresent()) {
                englishTitle = translation.get().getEnglishTranslation();
            } else{
                englishTitle = translateService.getTranslation(signTitle);
                DocTranslatedWord translatedWord = new DocTranslatedWord();
                translatedWord.setEnglishTranslation(englishTitle);
                translatedWord.setWord(signTitle);
                translatedWord.setLanguage("");
                translateTranslationRepository.insert(translatedWord);
            }

            String searchTerm =  englishTitle;
            return service.getImage(searchTerm, imageNumber);
        } catch (FlickrException e) {
           throw new Exception("Image cannot be found");
        }

    }
}
