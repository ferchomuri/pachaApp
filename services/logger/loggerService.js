import firebase from '../../utils/firebaseConfig';

export default {
  info: (message) => {
    console.log('INFO:', message);
    firebase.logger('INFO', message);
  },
  error: (message) => {
    console.error('ERROR:', message);
    firebase.logger('ERROR', message);
  },
};
