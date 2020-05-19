package com.newmedia.deafapi.api.services;

import com.newmedia.deafapi.api.dataservices.docModels.DocCategory;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoCategoryRepository;
import com.newmedia.deafapi.api.dataservices.interfaces.ICategoryRepository;
import com.newmedia.deafapi.api.dataservices.interfaces.ISignRepository;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.utils.CustomError;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

// By notating this class as service it is possible to autowire this class
@Service
public class CrudCategoryService implements ICategoryService<Category> {

    @Autowired
    private MongoCategoryRepository categoryICategoryRepository;

    @Override
    public List<Category> getCategories() {
        return new ArrayList(categoryICategoryRepository.findAll());
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
