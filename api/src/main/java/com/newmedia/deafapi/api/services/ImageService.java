package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.services.Interfaces.IImageService;
import org.springframework.stereotype.Service;

// By notating this class as service it is possible to autowire this class
@Service
public class ImageService implements IImageService {

    @Override
    public String getSignImage(int imageNumber, String signTitle, String signCategory) {
        if(imageNumber%2 == 1) {
            return "https://w.wallhaven.cc/full/dg/wallhaven-dgym8l.jpg";
        } else {
            return "https://w.wallhaven.cc/full/4l/wallhaven-4l8zxp.jpg";
        }
    }
}
