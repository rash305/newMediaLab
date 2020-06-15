package com.newmedia.deafapi.api.services.smartImage;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

@Service
public class TranslateService {
    @Value("${google.api.key}")
    private String key;

    @Autowired
    public TranslateService() {
    }

    public String getTranslation(String name, String language) throws IOException {
        Translate translate = TranslateOptions.newBuilder().setApiKey(key).build().getService();
        Translation translation = translate.translate(name, Translate.TranslateOption.sourceLanguage(language));
        return translation.getTranslatedText();
    }
}
