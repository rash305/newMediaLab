package com.newmedia.deafapi.api.services.smartImage;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.flickr4java.flickr.urls.UrlsInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.blizzed.pixabaylib.Pixabay;
import ru.blizzed.pixabaylib.PixabayCallException;
import ru.blizzed.pixabaylib.PixabayErrorException;
import ru.blizzed.pixabaylib.model.PixabayImage;
import ru.blizzed.pixabaylib.params.ColorsParam;
import ru.blizzed.pixabaylib.params.ImageTypeParam;
import ru.blizzed.pixabaylib.params.PixabayParams;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class SmartImageSearchService {

    @Value("${pixabay.api.key}")
    private String pixabayKey;

    public String getImage(String searchTerm, int number) {
        return getPixabayImage(searchTerm, number);
    }

    private String getPixabayImage(String searchTerm, int number) {
        Pixabay.initialize(pixabayKey);
        try {
            Optional<String> first = Pixabay.search()
                    .image(PixabayParams.QUERY.of(searchTerm), PixabayParams.PER_PAGE.of(3), PixabayParams.PAGE.of(number))
                    .execute()
                    .getHits()
                    .stream()
                    .map(PixabayImage::getPreviewURL)
                    .findFirst();
            if(first.isPresent()){
                return first.get();
            }
        } catch (PixabayCallException e) {
            e.printStackTrace();
        } catch (PixabayErrorException e) {
            e.printStackTrace();
        }
        return null;

    }

    private String getFlickrImage(String searchTerm, int number) throws FlickrException {
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
