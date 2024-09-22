import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import userService from '../user/userService';
import loggerService from '../logger/loggerService';

export default {
  configure: () => {
    try {
      GoogleSignin.configure({
        webClientId: '966046579398-da6g5utpg30jb8tff3he4bmpc8itc5fr.apps.googleusercontent.com',
      });
      loggerService.info('Configuración de Google Sign-In completada');
    } catch (error) {
      loggerService.error('Error en la configuración de Google Sign-In:', error);
      throw error;
    }
  },

  loginWithGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      const user = await userService.createUserDocument(userInfo.data.user);

      loggerService.info('Inicio de sesión con Google completado');
      return user;
    } catch (error) {
      loggerService.error('Error en el inicio de sesión con Google:', error);
      throw error;
    }
  },

  loginClassic: async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      loggerService.info('Inicio de sesión clásico completado');

      return userCredential;
    } catch (error) {
      loggerService.error('Error en el inicio de sesión clásico:' + error + ' / ' + email + ' / ');
      throw error;
    }
  },

  logout: async () => {
    try {
      if (GoogleSignin && GoogleSignin.isSignedIn) {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          loggerService.info('Cierre de sesión con Google completado');
          return;
        }
      }

      loggerService.info('Cierre de sesión completado');
      await auth().signOut();
    } catch (error) {
      loggerService.error('Error en el cierre de sesión:' + error);
      throw error;
    }
  },

  register: async (name, lastName, email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = {
        email,
        firstName: name,
        lastName,
      };

      const newUser = await userService.createUserDocument(user);

      loggerService.info('Registro completado');
      return newUser;
    } catch (error) {
      loggerService.error(
        'Error en el registro:',
        error + ' / ' + email + ' / ' + name + ' / ' + lastName
      );
      throw error;
    }
  },
};
