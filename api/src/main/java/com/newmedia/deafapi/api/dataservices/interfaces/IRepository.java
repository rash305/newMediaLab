package com.newmedia.deafapi.api.dataservices.interfaces;

import com.newmedia.deafapi.api.models.Sign;

import java.util.List;

public interface IRepository<T> {
    List<T> getAll();
    List<T> findAll(String unique);
    T add(T object);
    T update(T object);
}
