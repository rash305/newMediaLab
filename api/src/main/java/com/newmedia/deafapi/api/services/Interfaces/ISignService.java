package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.models.SignDetails;


import java.util.List;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface ISignService {
    List<Sign> getSigns();
    Sign createSign(Sign sign);
    SignDetails createSignDetails(SignDetails signDetails);
    void updateSign(Sign sign);

    void favoriteSign(String signId, String CategoryId, String userId);

    SignDetails getSignDetails(String id);
}
