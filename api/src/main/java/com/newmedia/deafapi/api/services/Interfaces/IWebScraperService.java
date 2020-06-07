package com.newmedia.deafapi.api.services.Interfaces;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface IWebScraperService {
    public void loadContents() throws MalformedURLException, IOException;
    public List<String> listAuthors();
    public List<Object> searchArticlesByAuthor(String authorName);
    public List<Object> searchArticleByTitle(String title);
    public List<Object> searchArticleByDescription(String desc);
}