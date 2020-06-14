package com.newmedia.deafapi.api.services.Interfaces;

import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.utils.CustomError;

import java.util.List;

// Any class that calls a service doesn't care about the exact implementation.
// A interface describes all accessible functionallity
public interface ICategoryService<C> {
    List<Category> getCategories(String acceptLanguage);
    List<Category> getPersonalCategories(String id, String acceptLanguage);

    Category createCategory(Category category);
    void updateCategory(Category category) throws CustomError;


}
