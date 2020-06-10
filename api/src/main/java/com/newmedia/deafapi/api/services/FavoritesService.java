package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.models.FavoriteSign;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// By notating this class as service it is possible to autowire this class
@Service
public class FavoritesService implements IFavoritesService {

    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;

    @Override
    public void favoriteSign(FavoriteSign favoriteSign) {
        DocFavoriteSign docFavoriteSign = ObjectMapperUtils.map(favoriteSign, DocFavoriteSign.class);
        favoriteSignRepository.insert(docFavoriteSign);
    }

    @Override
    public void unFavoriteSign(FavoriteSign favoriteSign) {
        String signId = favoriteSign.getSignId();
        String personId = favoriteSign.getPersonId();
        String videoId = favoriteSign.getVideoId();
        favoriteSignRepository.deleteBySignIdAndPersonIdAndVideoId(signId, personId, videoId);
    }

    @Override
    public List<String> getUsersOfFavoriteSign(String signId, String videoId) {
        try {
            List<DocFavoriteSign> signs = favoriteSignRepository.findBySignIdAndVideoId(signId, videoId);

            List<String> users = new ArrayList<>();
            for (DocFavoriteSign sign : signs) {
                users.add(sign.getPersonId());
            }
            return users;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
