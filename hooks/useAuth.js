import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import userService from '../services/user/userService';
import loggerService from '../services/logger/loggerService';
import { useUserStore } from '../hooks/useUserStore';

const useAuth = () => {
  const { setUser, clearUser } = useUserStore();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const configureGoogleSignIn = () => {
    try {
      GoogleSignin.configure({
        webClientId: '966046579398-da6g5utpg30jb8tff3he4bmpc8itc5fr.apps.googleusercontent.com',
      });
      loggerService.info('Configuración de Google Sign-In completada');
    } catch (error) {
      loggerService.error(`Error en la configuración de Google Sign-In: ${error.message}`);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    if (isSigningIn) {
      loggerService.warn('Ya hay una sesión de inicio de sesión en progreso');
      return;
    }

    setIsSigningIn(true);

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      const user = await userService.createUserDocument(userInfo.data.user);

      setUser(user);
      loggerService.info('Inicio de sesión con Google completado');
      return user;
    } catch (error) {
      console.log(error);
      loggerService.error(`Error en el inicio de sesión con Google: ${error.message}`);
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  };

  const loginClassic = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Email y contraseña son obligatorios');
      }

      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = await userService.getUserDocument({ email });
      console.log(user);

      setUser(user);

      loggerService.info('Inicio de sesión clásico completado');

      return userCredential;
    } catch (error) {
      loggerService.error(`Error en el inicio de sesión clásico: ${error.message} / ${email}`);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (GoogleSignin && GoogleSignin.isSignedIn) {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          clearUser();
          loggerService.info('Cierre de sesión con Google completado');
          return;
        }
      }

      clearUser();
      await auth().signOut();
      loggerService.info('Cierre de sesión completado');
    } catch (error) {
      loggerService.error(`Error en el cierre de sesión: ${error.message}`);
      throw error;
    }
  };

  const register = async (name, lastName, email, password) => {
    try {
      if (!name || !lastName || !email || !password) {
        loggerService.error('Todos los campos son obligatorios');
        throw new Error('Todos los campos son obligatorios');
      }

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
        `Error en el registro: ${error.message} / ${email} / ${name} / ${lastName}`
      );
      throw error;
    }
  };

  return {
    configureGoogleSignIn,
    loginWithGoogle,
    loginClassic,
    logout,
    register,
  };
};

export default useAuth;
