import * as categoryRepository from '../repositories/categoryRepository.js';

export const getAllCategories = () => categoryRepository.findAll();

export const getCategoryById = (id) => categoryRepository.findById(id);

export const createCategory = (data) => categoryRepository.create(data);

export const updateCategory = (id, data) => categoryRepository.update(id, data);

export const deleteCategory = (id) => categoryRepository.deleteCategory(id);