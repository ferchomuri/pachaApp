import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
import Input from '../components/Input';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import useAuth from '../hooks/useAuth';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Login = ({ navigation }) => {
  const { loginWithGoogle, loginClassic } = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Un error ocurrió', 'Credenciales incorrectas');
    }
  }, [error]);

  const loginGoogle = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      navigation.navigate('LocationAccess');
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      await loginClassic(formState.inputValues['email'], formState.inputValues['password']);
      navigation.navigate('LocationAccess');
      setError(null);
    } catch (error) {
      Alert.alert('Un error ocurrió', 'Credenciales incorrectas');
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={images.background5} style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar hidden />
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>Iniciar Sesión</Text>
        <Text style={commonStyles.subHeaderTitle}>Por favor, inicie sesión para continuar</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
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
          placeholder="*************"
          placeholderTextColor={COLORS.black}
          secureTextEntry={true}
        />

        <View style={commonStyles.checkBoxContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              style={commonStyles.checkbox}
              value={isChecked}
              color={isChecked ? COLORS.primary : COLORS.black}
              onValueChange={setChecked}
            />
            <Text style={{ ...FONTS.body4 }}>Recordar mi cuenta</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Iniciar Sesión"
          isLoading={isLoading}
          filled
          onPress={login}
          style={commonStyles.btn}
        />
        <View style={commonStyles.center}>
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Crea una cuenta</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.black,
            textAlign: 'center',
          }}
        >
          O
        </Text>

        <View style={commonStyles.socialContainer}>
          <GoogleSigninButton
            style={{
              width: SIZES.width - 40,
              height: 55,
            }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginGoogle}
            disabled={isLoading}
          />
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

export default Login;
