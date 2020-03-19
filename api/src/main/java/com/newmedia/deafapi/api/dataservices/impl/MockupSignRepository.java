package com.newmedia.deafapi.api.dataservices.impl;

import com.newmedia.deafapi.api.dataservices.interfaces.ISignRepository;
import com.newmedia.deafapi.api.models.Sign;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MockupSignRepository implements ISignRepository<Sign> {

    Sign[] signs = {
            new Sign("Dog"),
            new Sign("Konijn"),
    };
    @Override
    public List<Sign> getAll() {
        return Arrays.asList(signs);
    }

    @Override
    public List<Sign> findAll(String unique) {
        return new ArrayList<>();
    }

    @Override
    public Sign add(Sign object) {
        return null;
    }

    @Override
    public Sign update(Sign object) {
        return null;
    }
}
