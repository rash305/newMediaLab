package com.newmedia.deafapi.api.services.smartImage;

import com.flickr4java.flickr.FlickrException;
import com.newmedia.deafapi.api.dataservices.docModels.DocTranslatedWord;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoTranslationRepository;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import com.newmedia.deafapi.api.services.fileupload.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
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
    private FileStorageService fileStorageService;

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

    @Override
    public String saveImage(String imageUrl) throws MalformedURLException {
        BufferedImage image = null;
        try {
            String extention = "jpg";
            URL url = new URL(imageUrl);
            String[] extentionSplit = imageUrl.split(".");
            if(extentionSplit.length != 0){
                extention = extentionSplit[extentionSplit.length - 1];
            }

            image = ImageIO.read(url);
            int side = Math.min(image.getWidth(), image.getHeight());

            int x = (image.getWidth() - side) / 2;
            int y = (image.getHeight() - side) / 2;

            BufferedImage cropped = image.getSubimage(x, y, side, side);
            cropped.getScaledInstance(150, 150, Image.SCALE_SMOOTH);
            imageUrl = fileStorageService.storeImage(extention, cropped);
        } catch (IOException e) {
            return null;
        }

        return imageUrl;
    }
}
