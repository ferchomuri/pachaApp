import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import IAuthService from './IAuthService';

const userService = new UserService();

class FirebaseAuthService extends IAuthService {
  configure() {
    try {
      GoogleSignin.configure({
        webClientId: '966046579398-da6g5utpg30jb8tff3he4bmpc8itc5fr.apps.googleusercontent.com',
      });
    } catch (error) {
      console.error('Error en la configuración:', error.code, error.message);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      await userService.createUserDocument(userInfo.data);

      return userInfo;
    } catch (error) {
      console.error('Error en el login:', error.code, error.message);
      throw error;
    }
  }

  async logout() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error en el logout:', error.code, error.message);
      throw error;
    }
  }

  async register(email, password) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await userService.createUserDocument(user);

      return user;
    } catch (error) {
      console.error('Error en el registro:', error.code, error.message);
      throw error;
    }
  }
}

export default new FirebaseAuthService();
