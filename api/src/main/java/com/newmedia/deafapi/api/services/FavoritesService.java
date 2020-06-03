package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.services.Interfaces.IFavoritesService;
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
    public void favoriteSign(String signId, String categoryId, String userId) {
        DocFavoriteSign probe = new DocFavoriteSign();
        probe.setSignId(signId);
        probe.setCategoryId(categoryId);
        probe.setPersonId(userId);
        favoriteSignRepository.save(probe);
    }

    @Override
    public void unFavoriteSign(String signId, String personId) {
        favoriteSignRepository.deleteBySignIdAndAndPersonId(signId, personId);
    }

    @Override
    public List<String> getUsersOfFavoriteSign(String signId) {
        try {
            List<DocFavoriteSign> signs = favoriteSignRepository.findBySignId(signId);

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