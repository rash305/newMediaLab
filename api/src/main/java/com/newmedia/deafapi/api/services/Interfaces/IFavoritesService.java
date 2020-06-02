package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Sign;

import java.util.List;

public interface IFavoritesService {

    void favoriteSign(String signId, String CategoryId, String userId);
    List<String> getUsersOfFavoriteSign(String signId);
}
