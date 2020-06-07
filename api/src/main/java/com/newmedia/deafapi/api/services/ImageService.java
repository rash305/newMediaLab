package com.newmedia.deafapi.api.services;

import com.flickr4java.flickr.FlickrException;
import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// By notating this class as service it is possible to autowire this class
@Service
public class ImageService implements IImageService {

    @Autowired
    private SmartImageSearchService service;

    @Override
    public String getSignImage(int imageNumber, String signTitle, String signCategory) throws Exception {
        try {
            String searchTerm =  signTitle + " " + signCategory;

            return service.getImage(searchTerm, imageNumber);
        } catch (FlickrException e) {
           throw new Exception("Image cannot be found");
        }

    }
}
