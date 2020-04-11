package com.newmedia.deafapi.api.dataservices.impl;

import com.newmedia.deafapi.api.dataservices.interfaces.ICategoryRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MockupCategoryRepository implements ICategoryRepository<Category> {

    Category[] categories = {
            new Category("1", "Dieren"),
            new Category("2","Sport"),
            new Category("3", "Eten"),
            new Category("4","Winkelen"),
            new Category("5", "School"),
    };

    @Override
    public List<Category> getAll() {
        return Arrays.asList(categories);
    }

    @Override
    public List<Category> findAll(String unique) {
        return null;
    }

    @Override
    public Category add(Category object) {
        return null;
    }

    @Override
    public Category update(Category object) {
        return null;
    }
}
