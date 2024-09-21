import firestore from '@react-native-firebase/firestore';

class FirestoreService {
  constructor(collectionName) {
    this.collection = firestore().collection(collectionName);
  }

  async createDocument(docId, data) {
    try {
      await this.collection.doc(docId).set(data);
    } catch (error) {
      console.error('Error creating document:', error.code, error.message);
      throw error;
    }
  }

  async updateDocument(docId, data) {
    try {
      await this.collection.doc(docId).update(data);
    } catch (error) {
      console.error('Error updating document:', error.code, error.message);
      throw error;
    }
  }

  async getDocument(docId) {
    try {
      const doc = await this.collection.doc(docId).get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error.code, error.message);
      throw error;
    }
  }

  async deleteDocument(docId) {
    try {
      await this.collection.doc(docId).delete();
    } catch (error) {
      console.error('Error deleting document:', error.code, error.message);
      throw error;
    }
  }

  async getAllDocuments() {
    try {
      const collectionSnapshot = await this.collection.get();
      return collectionSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error getting documents:', error.code, error.message);
      throw error;
    }
  }
}

export { firestore, FirestoreService };
