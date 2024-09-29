import firestoreService from '../../utils/firebaseConfig';
import loggerService from '../logger/loggerService';

const collection = 'users';

export default {
  createUserDocument: async (user) => {
    try {
      const id = user.id;

      if (id) {
        const existingUser = await firestoreService.getDocument(collection, id);
        if (existingUser) {
          return existingUser;
        }
      }

      const dataToSave = {
        id: id,
        email: user.email,
        createdAt: firestoreService.getServerTimestamp(),
        firstName: user.givenName || user.firstName,
        lastName: user.familyName || user.lastName,
        photo: user.photo || null,
        phoneNumber: user.phoneNumber || null,
        lastLoginAt: firestoreService.getServerTimestamp(),
        completedOnboarding: false,
        role: null,
      };

      await firestoreService.createDocument(collection, dataToSave);

      loggerService.info('Creación de usuario completada');

      return dataToSave;
    } catch (error) {
      loggerService.error(`Error al crear usuario: ${error} - user: ${user}`);
      throw error;
    }
  },

  getUserDocument: async (uid) => {
    try {
      await firestoreService.getDocument(uid);
      return loggerService.info('Obtención de usuario completada');
    } catch (error) {
      loggerService.error(`Error al obtener usuario: ${error} - uid: ${uid}`);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      await firestoreService.getAllDocuments();
      return loggerService.info('Obtención de usuarios completada');
    } catch (error) {
      console.error(`Error al obtener todos los usuario: ${error}`);
      throw error;
    }
  },

  updateUserDocument: async (uid, data) => {
    try {
      await firestoreService.updateDocument(uid, data);
      return loggerService.info('Actualización de usuario completada');
    } catch (error) {
      loggerService.error(`Error al actualizar usuario: ${error} - uid: ${uid} - data: ${data}`);
      throw error;
    }
  },

  deleteUserDocument: async (uid) => {
    try {
      await firestoreService.deleteDocument(uid);
      return loggerService.info('Eliminación de usuario completada');
    } catch (error) {
      loggerService.error(`Error al eliminar usuario: ${error} - uid: ${uid}`);
      throw error;
    }
  },
};
