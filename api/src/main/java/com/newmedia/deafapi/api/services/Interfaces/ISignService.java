package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Sign;

import java.util.List;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface ISignService {
    List<Sign> getSigns();
    void createSign();
    void updateSign();
}
