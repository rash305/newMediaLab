package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;
import com.newmedia.deafapi.api.models.VideoReference;


import java.util.List;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface ISignService {
    List<Sign> getSigns(String category);
    List<Sign> getPersonalSigns(String userId, String category);
    List<Sign> getSearchedSigns(String searchTerm);
    Sign createSign(Sign sign);
    SignDetails createSignDetails(SignDetails signDetails);
    void updateSign(Sign sign);

    SignDetails getSignDetails(String id);
    SignDetails getSignDetails(String title, Category category);

    SignDetails addVideoToSign(SignDetails duplicate, VideoReference videos);
}
