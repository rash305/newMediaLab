//package com.newmedia.deafapi.api.services.smartImage;
//
//import com.newmedia.deafapi.api.services.Interfaces.IWebScraperService;
//import com.newmedia.deafapi.api.services.smartImage.WebScraperHelper;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.logging.Logger;
//import java.util.stream.Collectors;
//
//@Service
//public class WebScraperServiceImpl implements IWebScraperService {
//
//
//    private List<Object> articles = new ArrayList<>();
//
//    List<String> articleLinksSearchTags;
//
//    public WebScraperServiceImpl() {
//    }
//
//    @PostConstruct
//    @Override
//    public void loadContents() throws IOException {
//        articles.clear();
//        List<String> articleDetailsSearchTags = Arrays.asList(authorTagName, titleTagName, descTagName);
//        WebScraperHelper scraperHelper = new WebScraperHelper(newspaperUrl, parseTimeoutMillis, articleDetailsSearchTags, articleLinksSearchTags);
//
//
//        scraperHelper.fetchAllLinkMetaDetailsFromPage()
//                .thenAccept(list -> {
//                    list.stream().filter(map -> map.get(authorTagName) != null && map.get(authorTagName).length() > 0)
//                            .forEach(map -> {
//                                articles.add(new Article(map.get(titleTagName), map.get(descTagName), map.get(authorTagName)));
//                            });
//                });
//
//    }
//
//    @Override
//    public List<String> listAuthors() {
//        return articles.stream().map(a -> a.getAuthorName())
//                .distinct()
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<Object> searchArticlesByAuthor(String authorName) {
//        return articles.stream().filter(a -> a.getAuthorName().equalsIgnoreCase(authorName))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<Object> searchArticleByTitle(String title) {
//        return articles.stream().filter(a -> a.getTitle().startsWith(title))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<Object> searchArticleByDescription(String desc) {
//        return articles.stream().filter(a -> a.getDescription().startsWith(desc))
//                .collect(Collectors.toList());
//    }
//}