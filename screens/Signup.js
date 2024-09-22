import { MaterialIcons } from '@expo/vector-icons';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import Input from '../components/Input';
import { COLORS, images, SIZES } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import authService from '../services/auth/authServices';

const initialState = {
  inputValues: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  formIsValid: false,
};

const Signup = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [userInfo, setUserInfo] = useState();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const userInfo = await authService.loginWithGoogle();
      setUserInfo(userInfo);
      navigation.navigate('LocationAccess');
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClassic = async () => {
    try {
      setIsLoading(true);
      const user = await authService.register(
        formState.inputValues['name'],
        formState.inputValues['lastName'],
        formState.inputValues['email'],
        formState.inputValues['password']
      );
      setUserInfo(user);
      navigation.navigate('LocationAccess');
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authService.configure();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('Main');
    }
  }, [userInfo]);

  return (
    <ImageBackground source={images.background4} style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar hidden={true} />
      <View style={commonStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={commonStyles.backIcon}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Crea tu cuenta</Text>
        <Text style={commonStyles.subHeaderTitle}>
          Con un solo toque empezaremos nuestra historia
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
        <KeyboardAwareScrollView>
          <Text style={commonStyles.inputHeader}>Nombre</Text>
          <Input
            id="name"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['name']}
            placeholder="Tu nombre"
            placeholderTextColor={COLORS.black}
          />
          <Text style={commonStyles.inputHeader}>Apellido</Text>
          <Input
            id="lastName"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['lastName']}
            placeholder="Tu apellido"
            placeholderTextColor={COLORS.black}
          />
          <Text style={commonStyles.inputHeader}>Correo</Text>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder="example@gmail.com"
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
          />
          <Text style={commonStyles.inputHeader}>Contraseña</Text>
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="password"
            placeholder=""
            placeholderTextColor={COLORS.black}
            secureTextEntry={true}
          />
          <Text style={commonStyles.inputHeader}>Vuélve a escribir tu contraseña</Text>
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['passwordConfirm']}
            autoCapitalize="none"
            id="passwordConfirm"
            placeholder=""
            placeholderTextColor={COLORS.black}
            secureTextEntry={true}
          />
          <Button
            title="CREAR CUENTA"
            isLoading={isLoading}
            filled
            onPress={handleLoginClassic}
            style={commonStyles.btn1}
          />
          <Text style={commonStyles.inputHeader}>O conéctate con</Text>
          <View style={commonStyles.center}>
            <GoogleSigninButton
              style={{ width: SIZES.width - 40, height: 55 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleLoginWithGoogle}
              disabled={isLoading}
            />
          </View>
        </KeyboardAwareScrollView>
      </Animatable.View>
    </ImageBackground>
  );
};

export default Signup;
