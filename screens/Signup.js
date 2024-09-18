import { MaterialIcons } from '@expo/vector-icons'
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import {
    Alert,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button'
import Input from '../components/Input'
import { COLORS, images, SIZES } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import auth from '@react-native-firebase/auth'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
    },
    formIsValid: false,
}

const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [userInfo, setUserInfo] = useState()

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    const loginWithGoogle = async () => {
        try {
            setIsLoading
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            const idToken = userInfo.data.idToken
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
            await auth().signInWithCredential(googleCredential)
            setUserInfo(userInfo)
            setError(null)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const logOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setUserInfo(null)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '966046579398-da6g5utpg30jb8tff3he4bmpc8itc5fr.apps.googleusercontent.com',
        })
    }, [])

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            navigation.navigate('Main')
        }
    }, [userInfo])

    return (
        <ImageBackground
            source={images.background4}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Crea tu cuenta</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Con un solo toque empezaremos nuestra historia
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <KeyboardAwareScrollView>
                    <Text style={commonStyles.inputHeader}>Nombre</Text>
                    <Input
                        id="fullName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        placeholder="Fernando Murillo"
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
                        placeholder="*************"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                    />

                    <Text style={commonStyles.inputHeader}>
                        Vuélve a escribir tu contraseña
                    </Text>
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['passwordConfirm']}
                        autoCapitalize="none"
                        id="passwordConfirm"
                        placeholder="*************"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                    />

                    <Button
                        title="CREAR CUENTA"
                        isLoading={isLoading}
                        filled
                        onPress={() => navigation.navigate('Login')}
                        style={commonStyles.btn1}
                    />
                    <Text style={commonStyles.inputHeader}>
                        O conéctate con
                    </Text>
                    <View style={commonStyles.center}>
                        <GoogleSigninButton
                            style={{
                                width: SIZES.width - 40,
                                height: 55,
                            }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => {
                                loginWithGoogle()
                            }}
                            disabled={isLoading}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </Animatable.View>
        </ImageBackground>
    )
}

export default Signup
