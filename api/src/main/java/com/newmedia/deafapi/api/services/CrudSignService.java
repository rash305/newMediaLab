package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.interfaces.ISignRepository;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ISignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudSignService implements ISignService {

    @Autowired
    private ISignRepository<Sign> signISignRepository;

    @Override
    public List<Sign> getSigns() {
        return new ArrayList( signISignRepository.getAll());
    }

    @Override
    public void createSign() {

    }

    @Override
    public void updateSign() {

    }
}
