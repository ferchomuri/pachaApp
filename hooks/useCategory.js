import { useState } from 'react';
import { categoryStore } from '../store/category/categoryStore';
import categoryService from '../services/category/categoryService';

const useCategory = () => {
  const [categories, setCategories] = useState(categoryStore.getState().categories);

  const getCategories = async () => {
    try {
      const categories = await categoryService.getAllCategories();
      setCategories(categories);
    } catch (error) {
      console.error(`Error getting categories: ${error}`);
    }
  };

  const filterCategories = (search) => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return {
    categories,
    getCategories,
    filterCategories,
  };
};

export default useCategory;
