package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Sign;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

// By notating this class as service it is possible to autowire this class
@Service
public interface ISignOfDayService {
    Sign getSignOfDay(String userId, LocalDate today, String acceptLanguage);
    Sign createSignOfDay(String userId, LocalDate today, String acceptLanguage);
}
