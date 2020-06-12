package com.newmedia.deafapi.api.services.smartImage;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.auth.Auth;
import com.flickr4java.flickr.auth.Permission;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.blizzed.pixabaylib.Pixabay;
import ru.blizzed.pixabaylib.PixabayCallException;
import ru.blizzed.pixabaylib.PixabayErrorException;
import ru.blizzed.pixabaylib.model.PixabayImage;
import ru.blizzed.pixabaylib.params.ImageTypeParam;
import ru.blizzed.pixabaylib.params.PixabayParams;

import java.util.Optional;
import java.util.Properties;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.lang.Math.ceil;
import static java.lang.Math.floor;


@Service
public class SmartImageSearchService {

    @Value("${pixabay.api.key}")
    private String pixabayKey;

    private Flickr f;
    private RequestContext requestContext;
    private Properties properties;

    @Autowired
    public SmartImageSearchService() {
        String apiKey = "9c171ede50099b7a558151593371061a";
        String sharedSecret = "076463b1d1ef7dc6";
        f = new Flickr(apiKey, sharedSecret, new REST());
        requestContext = RequestContext.getRequestContext();
        Auth auth = new Auth();
        auth.setPermission(Permission.READ);
        auth.setToken(apiKey);
        auth.setTokenSecret(sharedSecret);
        requestContext.setAuth(auth);
        Flickr.debugRequest = false;
        Flickr.debugStream = false;

    }

    public String getImage(String searchTerm, int number) {
        String image = getOneImage(searchTerm, number);
        if (image == null) {
            String[] s = searchTerm.split(" ");
            if (s.length > 1) {
                image = getOneImage(s[0], number);
            }
        }
        return image;
    }

    private String getOneImage(String searchTerm, int number) {
        String image = null;
        boolean even = number % 2 == 0;
        // Get uneven numbers from pixabay first
        if (even) {
            image = getPixabayImage(searchTerm, (int) ceil(number/2));
        }
        // Get image from flickr if not already found one
        if (!even) {
            try {
                image = getFlickrImage(searchTerm, (int) floor(number/3)+1);
            } catch (Exception e) {
                // Try to get an image from pixabay if not available
                image = getPixabayImage(searchTerm, number);
            }
        }


        return image;
    }

    private String getPixabayImage(String searchTerm, int number) {
        Pixabay.initialize(pixabayKey);
        int page = number < 3 ? 3 : number;
        try {
            Optional<PixabayImage> first = Pixabay.search()
                    .image(PixabayParams.QUERY.of(searchTerm), PixabayParams.PER_PAGE.of(page), PixabayParams.IMAGE_TYPE.of(ImageTypeParam.Type.PHOTO))
                    .execute()
                    .getHits()
                    .stream()
                    .skip(number)
                    .findFirst();
            if (first.isPresent()) {
                return first.get().getWebformatURL();
            }
        } catch (PixabayCallException e) {
            e.printStackTrace();
        } catch (PixabayErrorException e) {
            e.printStackTrace();
        }
        return null;

    }

    private String getFlickrImage(String searchTerm, int number) throws FlickrException {
        PhotosInterface photos = f.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setLicense("9");
        params.setMedia("photos"); // One of "photos", "videos" or "all"
        params.setExtras(Stream.of("media").collect(Collectors.toSet()));
        params.setText(searchTerm);
        params.setSort(6);
        PhotoList<Photo> results = photos.search(params, 1, number);
        return "https://live.staticflickr.com/" + results.get(0).getServer() + "/" + results.get(0).getId() + "_" + results.get(0).getSecret() + "." + results.get(0).getOriginalFormat();
    }
}
