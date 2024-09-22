import firestore from '@react-native-firebase/firestore';

export default {
  createDocument: async (collectionName, data) => {
    try {
      const collection = firestore().collection(collectionName);
      if (!data.id) {
        delete data.id;
        await collection.add(data);
      } else {
        await collection
          .doc(data.id)
          .set(data)
          .then(() => {
            console.log('Document successfully written!');
          });
      }
    } catch (error) {
      firestore()
        .collection('logs')
        .add({
          level: 'ERROR',
          message:
            `Error creating document: ${error}` +
            JSON.stringify(data) +
            ' in collection:' +
            collectionName,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      throw error;
    }
  },

  updateDocument: async (collectionName, docId, data) => {
    try {
      const collection = firestore().collection(collectionName);
      await collection.doc(docId).update(data);
    } catch (error) {
      firestore()
        .collection('logs')
        .add({
          level: 'ERROR',
          message:
            `Error updateDocument: ${error}` +
            JSON.stringify(data) +
            docId +
            ' in collection:' +
            collectionName,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      throw error;
    }
  },

  getDocument: async (collectionName, docId) => {
    try {
      const collection = firestore().collection(collectionName);
      const doc = await collection.doc(docId);
      if (doc.exists) {
        return doc.data();
      } else {
        firestore()
          .collection('logs')
          .add({
            level: 'INFO',
            message: `No such document: ${docId} in collection: ${collectionName}`,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        return null;
      }
    } catch (error) {
      firestore()
        .collection('logs')
        .add({
          level: 'ERROR',
          message: `Error getDocument: ${error}`,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      throw error;
    }
  },

  deleteDocument: async (collectionName, docId) => {
    try {
      const collection = firestore().collection(collectionName);
      await collection.doc(docId).delete();
    } catch (error) {
      firestore()
        .collection('logs')
        .add({
          level: 'ERROR',
          message: `Error deleteDocument: ${error}` + docId + ' in collection: ' + collectionName,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      throw error;
    }
  },

  getAllDocuments: async (collectionName) => {
    try {
      const collection = firestore().collection(collectionName);
      const collectionSnapshot = await collection.get();
      return collectionSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      firestore()
        .collection('logs')
        .add({
          level: 'ERROR',
          message: `Error getAllDocuments: ${error}` + ' in collection: ' + collectionName,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      throw error;
    }
  },

  getServerTimestamp: async () => {
    return firestore.FieldValue.serverTimestamp();
  },

  logger: (level, message) => {
    firestore().collection('logs').add({
      level,
      message,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  },
};
