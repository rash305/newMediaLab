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
    public void favoriteSign(String signId, String CategoryId, String userId) {
        DocFavoriteSign probe = new DocFavoriteSign();
        probe.setSignId(signId);
        probe.setCategoryId(CategoryId);
        probe.setPersonId(userId);
        favoriteSignRepository.save(probe);
    }

    @Override
    public List<String> getUsersOfFavoriteSign(String SignId) {
        try {
            List<DocFavoriteSign> signs = favoriteSignRepository.findBySignId(SignId);

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
