package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface IVideoService {
    MultipartFile getVideo(String id) throws IOException, ClassNotFoundException;
    String saveVideo(MultipartFile file) throws IOException;
}
