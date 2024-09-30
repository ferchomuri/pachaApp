import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/CommonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker } from '../utils/ImagePickerHelper';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import { ScrollView } from 'react-native-virtualized-view';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '../hooks/useUserStore';
import loggerService from '../services/logger/loggerService';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    phoneNumber: '',
    bio: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    phoneNumber: false,
    bio: false,
  },
  formIsValid: false,
};

const EditProfile = () => {
  const { user } = useUserStore();
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  // const [formState, dispatchFormState] = useReducer(reducer, initialState);

  // const inputChangedHandler = useCallback(
  //   (inputId, inputValue) => {
  //     const result = validateInput(inputId, inputValue);
  //     dispatchFormState({ inputId, validationResult: result, inputValue });
  //   },
  //   [dispatchFormState]
  // );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      // set the image
      setImage({ uri: tempUri });
    } catch (error) {
      setError(error.message);
      loggerService.error(`Error al obtener imagen: ${error}`);
    }
  };

  const renderHeader = () => {
    const navigation = useNavigation();
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.header1Icon}>
            <Image
              resizeMode="contain"
              source={icons.arrowLeft}
              style={{
                height: 24,
                width: 24,
                tintColor: COLORS.black,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 12,
              fontSize: 17,
              fontFamily: 'regular',
            }}
          >
            Editar Perfil
          </Text>
        </View>
      </View>
    );
  };

  const renderEditProfileForm = () => {
    const navigation = useNavigation();
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ marginVertical: 12 }}>
          <Image
            source={user.photo === null ? images.avatar : { uri: user.photo }}
            resizeMode="cover"
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
            }}
          />
          <TouchableOpacity
            disabled
            onPress={pickImage}
            style={{
              height: 42,
              width: 42,
              borderRadius: 21,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          >
            <MaterialCommunityIcons name="pencil-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: SIZES.width - 32,
          }}
        >
          <Text style={commonStyles.inputHeader}>Nombre</Text>
          <Input
            id="firstName"
            disabled
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities['fullName']}
            placeholder={user.firstName}
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
          <Text style={commonStyles.inputHeader}>Apellido</Text>
          <Input
            id="lastName"
            disabled
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities['fullName']}
            placeholder={user.lastName}
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
          <Text style={commonStyles.inputHeader}>Correo Electrónico</Text>
          <Input
            id="email"
            disabled
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities['email']}
            placeholder={user.email}
            placeholderTextColor="rgba(0,0,0,0.5)"
            keyboardType="email-address"
          />
          <Text style={commonStyles.inputHeader}>Teléfono</Text>
          <Input
            id="phoneNumber"
            disabled
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities['phoneNumber']}
            placeholder={user.phoneNumber}
            placeholderTextColor="rgba(0,0,0,0.5)"
            keyboardType="numeric"
          />
          <Text style={commonStyles.inputHeader}>Rol</Text>
          <Input
            id="role"
            disabled
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities['bio']}
            placeholder={user.role}
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
          <Button
            disabled
            title="SAVE"
            filled
            onPress={() => navigation.navigate('PersonalProfile')}
            style={{
              marginTop: 12,
              marginBottom: 30,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,
          marginHorizontal: 16,
        }}
      >
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>{renderEditProfileForm()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
