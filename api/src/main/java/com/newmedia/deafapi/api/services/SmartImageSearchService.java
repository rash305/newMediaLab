package com.newmedia.deafapi.api.services;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.flickr4java.flickr.test.TestInterface;
import com.newmedia.deafapi.api.dtos.SignDto;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class SmartImageSearchService {
    public String getImage(String searchTerm, int number) throws FlickrException {
        String apiKey = "9c171ede50099b7a558151593371061a";
        String sharedSecret = "076463b1d1ef7dc6";
        Flickr f = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface photos = f.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setMedia("photos"); // One of "photos", "videos" or "all"
        params.setExtras(Stream.of("media").collect(Collectors.toSet()));
        params.setText(searchTerm);
        PhotoList<Photo> results = photos.search(params, number, 0);
        return "https://live.staticflickr.com/" + results.get(number -1).getServer() + "/" + results.get(number -1).getId() + "_" + results.get(number -1).getSecret() + "." + results.get(number -1).getOriginalFormat();
    }
}
