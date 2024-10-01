import firestoreService from '../../utils/firebaseConfig';
import loggerService from '../logger/loggerService';

const collection = 'categories';

export default {
  createCategoryDocument: async (category) => {
    try {
      const id = category.id;

      if (id) {
        const existingCategory = await firestoreService.getDocument(collection, id);
        if (existingCategory) {
          return existingCategory;
        }
      }

      const dataToSave = {
        id: id,
        name: category.name,
        createdAt: firestoreService.getServerTimestamp(),
        updatedAt: firestoreService.getServerTimestamp(),
      };

      await firestoreService.createDocument(collection, dataToSave);

      loggerService.info('Creación de categoría completada');

      return dataToSave;
    } catch (error) {
      loggerService.error(`Error al crear categoría: ${error} - category: ${category}`);
      throw error;
    }
  },

  getCategoryDocument: async (params) => {
    try {
      const category = await firestoreService.getDocument(collection, params);
      console.log(category);
      loggerService.info('Obtención de categoría completada');
      return category;
    } catch (error) {
      loggerService.error(`Error al obtener categoría: ${error} - params: ${params}`);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const categories = await firestoreService.getAllDocuments(collection);

      loggerService.info('Obtención de categorías completada');

      return categories;
    } catch (error) {
      console.error(`Error al obtener todas las categorías: ${error}`);
      throw error;
    }
  },

  updateCategoryDocument: async (category) => {
    try {
      const dataToUpdate = {
        name: category.name,
        updatedAt: firestoreService.getServerTimestamp(),
      };

      await firestoreService.updateDocument(collection, category.id, dataToUpdate);

      loggerService.info('Actualización de categoría completada');

      return dataToUpdate;
    } catch (error) {
      loggerService.error(`Error al actualizar categoría: ${error} - category: ${category}`);
      throw error;
    }
  },

  deleteCategoryDocument: async (id) => {
    try {
      await firestoreService.deleteDocument(collection, id);
      return loggerService.info('Eliminación de categoría completada');
    } catch (error) {
      loggerService.error(`Error al eliminar categoría: ${error} - id: ${id}`);
      throw error;
    }
  },
};
