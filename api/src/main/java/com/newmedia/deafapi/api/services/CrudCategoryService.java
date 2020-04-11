package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.interfaces.ICategoryRepository;
import com.newmedia.deafapi.api.dataservices.interfaces.ISignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudCategoryService implements ICategoryService<Category> {

    @Autowired
    private ICategoryRepository<Category> categoryICategoryRepository;

    @Override
    public List<Category> getCategories() {
        return new ArrayList(  categoryICategoryRepository.getAll());
    }

    @Override
    public void createCategory() {

    }

    @Override
    public void updateCategory() {

    }
}
