import firestoreService from '../../utils/firebaseConfig';
import loggerService from '../logger/loggerService';

const collection = 'products';

export default {
  createProduct: async (id, product) => {
    try {
      const existingProduct = await firestoreService.getDocument(collection, id);
      if (existingProduct) {
        return existingProduct;
      }

      const dataToSave = {
        id: id,
        name: product.name,
        price: product.price,
        description: product.description,
        shopLogo: product.shopLogo,
        sellerId: firestoreService.getDocumentReference('users', product.sellerId),
        categoryId: firestoreService.getDocumentReference('categories', product.categoryId),
        createdAt: firestoreService.getServerTimestamp(),
        updatedAt: firestoreService.getServerTimestamp(),
      };

      await firestoreService.createDocument(collection, dataToSave);

      loggerService.info('Creación de producto completada');

      return dataToSave;
    } catch (error) {
      loggerService.error(`Error al crear producto: ${error} - product: ${product}`);
      throw error;
    }
  },

  getProductDocument: async (id) => {
    try {
      const product = await firestoreService.getDocument(collection, id);

      if (product) {
        const sellerDoc = await product.sellerId.get();
        const categoryDoc = await product.categoryId.get();

        product.sellerId = sellerDoc.data();
        product.categoryId = categoryDoc.data();
      }

      loggerService.info('Obtención de producto completada');
      return product;
    } catch (error) {
      loggerService.error(`Error al obtener producto: ${error} - id: ${id}`);
      throw error;
    }
  },

  getAllProducts: async () => {
    try {
      const products = await firestoreService.getAllDocuments(collection);

      const productsWithDetails = await Promise.all(
        products.map(async (product) => {
          const sellerDoc = await product.sellerId.get();
          const categoryDoc = await product.categoryId.get();

          return {
            ...product,
            sellerId: sellerDoc.data(),
            categoryId: categoryDoc.data(),
          };
        })
      );

      loggerService.info('Obtención de productos completada');
      console.log('productsWithDetails', productsWithDetails);
      return productsWithDetails;
    } catch (error) {
      console.error(`Error al obtener todos los productos: ${error}`);
      throw error;
    }
  },

  updateProductDocument: async (product) => {
    try {
      const dataToUpdate = {
        name: product.name,
        price: product.price,
        updatedAt: firestoreService.getServerTimestamp(),
      };

      await firestoreService.updateDocument(collection, product.id, dataToUpdate);

      loggerService.info('Actualización de producto completada');

      return dataToUpdate;
    } catch (error) {
      loggerService.error(`Error al actualizar producto: ${error} - product: ${product}`);
      throw error;
    }
  },

  deleteProductDocument: async (productId) => {
    try {
      await firestoreService.deleteDocument(collection, productId);
      loggerService.info('Eliminación de producto completada');
    } catch (error) {
      loggerService.error(`Error al eliminar producto: ${error} - productId: ${productId}`);
      throw error;
    }
  },
};
