package com.newmedia.deafapi.api.services.smartImage;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.flickr4java.flickr.test.TestInterface;
import com.flickr4java.flickr.urls.UrlsInterface;
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
        UrlsInterface urlsInterface = f.getUrlsInterface();
        PhotosInterface photos = f.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setLicense("9");
        params.setMedia("photos"); // One of "photos", "videos" or "all"
        params.setExtras(Stream.of("media").collect(Collectors.toSet()));
        params.setText(searchTerm);
        PhotoList<Photo> results = photos.search(params, 1, number);
        return "https://live.staticflickr.com/" + results.get(0).getServer() + "/" + results.get(0).getId() + "_" + results.get(0).getSecret() + "." + results.get(0).getOriginalFormat();
    }
}
