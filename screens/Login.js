import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, FONTS, images, icons } from '../constants'
import Checkbox from 'expo-checkbox'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'

const isTestMode = true

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
}

const Login = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    // implementing facebook authentication
    const facebookAuthHandler = () => {
        return null
    }

    // implementing twitter authentication
    const twitterAuthHandler = () => {
        return null
    }

    // implementing apple authentication
    const appleAuthHandler = () => {
        return null
    }

    return (
        <ImageBackground
            source={images.background5}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Iniciar Sesión</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Por favor, inicie sesión para continuar
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
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
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Checkbox
                            style={commonStyles.checkbox}
                            value={isChecked}
                            color={isChecked ? COLORS.primary : COLORS.black}
                            onValueChange={setChecked}
                        />
                        <Text style={{ ...FONTS.body4 }}>
                            Recordar mi cuenta
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Iniciar Sesión"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigation.navigate('LocationAccess')}
                    style={commonStyles.btn}
                />
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                        ¿No tienes una cuenta?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            Crea una cuenta
                        </Text>
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
                    <TouchableOpacity
                        onPress={facebookAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.facebook}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ImageBackground>
    )
}

export default Login
