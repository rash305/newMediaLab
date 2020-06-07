package com.newmedia.deafapi.api.services.Interfaces;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface IImageService {
    String getSignImage(int imageNumber, String signTitle, String signCategory) throws Exception;
}
