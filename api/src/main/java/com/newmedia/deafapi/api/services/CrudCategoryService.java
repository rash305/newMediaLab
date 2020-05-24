package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.docModels.DocFavoriteSign;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoFavoriteSignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.utils.CustomError;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudCategoryService implements ICategoryService<Category> {

    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;
    @Autowired
    private MongoFavoriteSignRepository favoriteSignRepository;

    @Override
    public List<Category> getCategories() {
        List<DocCategory> all = categoryICategoryRepository.findAll();

        return ObjectMapperUtils.mapAll(all, Category.class);
    }

    @Override
    public List<Category> getPersonalCategories(String id) {
        List<String> categoryIds = getPersonalCategoryIds(id);
        Iterable<DocCategory> allById = categoryICategoryRepository.findAllById(categoryIds);
        // Map iterable to a list
        List<DocCategory> docCategories = StreamSupport.stream(allById.spliterator(), false)
                .collect(Collectors.toList());
        return ObjectMapperUtils.mapAll(docCategories, Category.class);
    }

    private List<String>  getPersonalCategoryIds(String id) {
        // Create terms how to match the example with the objects in database
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("categoryId", ignoreCase());
        // Example object
        DocFavoriteSign probe = new DocFavoriteSign();
        probe.setPersonId(id);
        // Create the example with matcher and example object
        Example<DocFavoriteSign> example = Example.of(probe, modelMatcher);
        List<DocFavoriteSign> s = favoriteSignRepository.findAll(example);
        // Create a list of string of the categoryId only
        return s.stream().map(DocFavoriteSign::getCategoryId).collect(Collectors.toList());
    }

    @Override
    public Category createCategory(Category category) {
        DocCategory c = ObjectMapperUtils.map(category, DocCategory.class);
        categoryICategoryRepository.insert(c);
        // return category with ID
        return ObjectMapperUtils.map(c, Category.class);
    }

    @Override
    public void updateCategory(Category category) throws CustomError {
        if(categoryICategoryRepository.findById(category.getId()) == null){
            throw new CustomError("", CustomError.ErrorTypeEnum.NotFound);
        }
        DocCategory docCategory = ObjectMapperUtils.map(category, DocCategory.class);
        categoryICategoryRepository.save(docCategory);
    }
}
