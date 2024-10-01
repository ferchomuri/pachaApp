import { useState } from 'react';
import { productStore } from '../store/product/productStore';
import productService from '../services/product/productService';

const useProduct = () => {
  const [products, setProducts] = useState(productStore.getState().products);

  const getProducts = async () => {
    try {
      const products = await productService.getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error(`Error getting products: ${error}`);
    }
  };

  const filterProducts = (search) => {
    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  };

  return {
    products,
    getProducts,
    filterProducts,
  };
};

export default useProduct;
