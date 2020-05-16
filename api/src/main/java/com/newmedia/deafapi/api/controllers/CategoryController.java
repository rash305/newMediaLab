package com.newmedia.deafapi.api.controllers;

import com.newmedia.deafapi.api.dtos.CategoryDto;
import com.newmedia.deafapi.api.dtos.SignDto;
import com.newmedia.deafapi.api.models.Category;
import com.newmedia.deafapi.api.models.Sign;
import com.newmedia.deafapi.api.services.Interfaces.ICategoryService;
import com.newmedia.deafapi.api.utils.ObjectMapperUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.logging.Logger;

// Add notation to inform spring boot to create an instance of this class and publish it as a rest controller
@RestController
public class CategoryController {

    // Spring boot dependency injection
    //https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/
    @Autowired
    private ICategoryService ICategoryService;

    // API PATH based on guidelines of REST
    // https://restfulapi.net/resource-naming/
    @GetMapping("/api/categories/")
    public List<CategoryDto> getSignList() {
        List<Category> categories = ICategoryService.getCategories();
        if (categories == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No categories can be requested.");
        }

        List<CategoryDto> categoryDtos = ObjectMapperUtils.mapAll(categories, CategoryDto.class);
        return categoryDtos;
    }

    @PostMapping("/api/categories")
    public CategoryDto createSign(@RequestBody CategoryDto category) {
        Category categoryModel = ObjectMapperUtils.map(category, Category.class);
        if(categoryModel == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No category is given.");
        }
        categoryModel = ICategoryService.createCategory(categoryModel);
        return ObjectMapperUtils.map(categoryModel, CategoryDto.class);
    }
}
