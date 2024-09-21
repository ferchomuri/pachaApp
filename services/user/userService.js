import { FirestoreService } from '../utils/firebaseConfig';
import IUserService from './IUserService';
import { firestore } from 'firebase'; // Asegúrate de que esta importación sea correcta según tu configuración

class UserService extends IUserService {
  constructor() {
    super();
    this.firestoreService = new FirestoreService('users');
  }

  async createUserDocument(user) {
    try {
      console.log('Creating user document:', user);
      await this.firestoreService.createDocument(user.uid, {
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        fullName: user.displayName,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        photoURL: user.photoURL,
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error al crear el documento del usuario:', error.code, error.message);
      throw error;
    }
  }

  async getUserDocument(uid) {
    try {
      return await this.firestoreService.getDocument(uid);
    } catch (error) {
      console.error('Error getting document:', error.code, error.message);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await this.firestoreService.getAllDocuments();
    } catch (error) {
      console.error('Error getting documents:', error.code, error.message);
      throw error;
    }
  }

  async updateUserDocument(uid, data) {
    try {
      await this.firestoreService.updateDocument(uid, data);
    } catch (error) {
      console.error('Error updating document:', error.code, error.message);
      throw error;
    }
  }

  async deleteUserDocument(uid) {
    try {
      await this.firestoreService.deleteDocument(uid);
    } catch (error) {
      console.error('Error deleting document:', error.code, error.message);
      throw error;
    }
  }
}

export { UserService };
