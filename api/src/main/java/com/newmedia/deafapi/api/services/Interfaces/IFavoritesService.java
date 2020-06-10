package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.FavoriteSign;

import java.util.List;

public interface IFavoritesService {

    void favoriteSign(FavoriteSign favoriteSign);
    void unFavoriteSign(String signId, String personId);
    List<String> getUsersOfFavoriteSign(String signId, String videoId);
}
