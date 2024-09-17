import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
    Onboarding1,
    Onboarding2,
    Onboarding3,
    Onboarding4,
    Signup,
    Verification,
    Login,
    StartUpScreen,
    ForgotPassword,
    ResetPassword,
    LocationAccess,
    PersonalProfile,
    EditProfile,
    Address,
    AddNewAddress,
    PaymentMethod,
    AddNewPaymentMethod,
    PaymentSuccess,
    PaymentDeclined,
    Faqs,
    SubmitQuestion,
    Settings,
    Chat,
    Call,
    Message,
    VideoCall,
    AddNewPaymentMethodDeclined,
    AddNewPaymentMethodSuccess,
    Notifications,
    Promotion,
    TopDeals,
    SpecialOffers,
    Categories,
    MyWishlist,
    Detail,
    CarReviews,
    MakeOffer,
    MakeOfferProcessed,
    MakeOfferAccepted,
    MakeOfferRejected,
    Checkout,
    ChooseShipping,
    EnterYourPIN,
    ReviewSummary,
    SelectPaymentMethods,
    ShippingAddress,
    TrackOrdersV1,
    TrackOrdersV2,
    AddReviews,
    History,
    TransactionHistory,
    ShopView,
    CarByKeywords,
    ShopView2
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }

        checkIfFirstLaunch()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding1' : 'Signup'}>
                <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding3" component={Onboarding3} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding4" component={Onboarding4} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="StartUpScreen" component={StartUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
                <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
                <Stack.Screen name="LocationAccess" component={LocationAccess} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="PersonalProfile" component={PersonalProfile} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
                <Stack.Screen name="AddNewAddress" component={AddNewAddress} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
                <Stack.Screen name="AddNewPaymentMethod" component={AddNewPaymentMethod} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDeclined" component={PaymentDeclined} options={{ headerShown: false }} />
                <Stack.Screen name="Faqs" component={Faqs} options={{ headerShown: false }} />
                <Stack.Screen name="SubmitQuestion" component={SubmitQuestion} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <Stack.Screen name="Call" component={Call} options={{ headerShown: false }} />
                <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
                <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }}/>
                <Stack.Screen name="AddNewPaymentMethodDeclined" component={AddNewPaymentMethodDeclined} options={{ headerShown: false }}/>
                <Stack.Screen name="AddNewPaymentMethodSuccess" component={AddNewPaymentMethodSuccess} options={{ headerShown: false }}/>
                <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}/>
                <Stack.Screen name="Promotion" component={Promotion} options={{ headerShown: false }}/>
                <Stack.Screen name="TopDeals" component={TopDeals} options={{ headerShown: false }}/>
                <Stack.Screen name="SpecialOffers" component={SpecialOffers} options={{ headerShown: false }}/>
                <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
                <Stack.Screen name="MyWishlist" component={MyWishlist} options={{ headerShown: false }}/>
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
                <Stack.Screen name="CarReviews" component={CarReviews} options={{ headerShown: false }}/>
                <Stack.Screen name="MakeOffer" component={MakeOffer} options={{ headerShown: false }}/>
                <Stack.Screen name="MakeOfferProcessed" component={MakeOfferProcessed} options={{ headerShown: false }}/>
                <Stack.Screen name="MakeOfferAccepted" component={MakeOfferAccepted} options={{ headerShown: false }}/>
                <Stack.Screen name="MakeOfferRejected" component={MakeOfferRejected} options={{ headerShown: false }}/>
                <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }}/>
                <Stack.Screen name="ChooseShipping" component={ChooseShipping} options={{ headerShown: false }}/>
                <Stack.Screen name="EnterYourPIN" component={EnterYourPIN} options={{ headerShown: false }}/>
                <Stack.Screen name="ReviewSummary" component={ReviewSummary} options={{ headerShown: false }}/>
                <Stack.Screen name="SelectPaymentMethods" component={SelectPaymentMethods} options={{ headerShown: false }}/>
                <Stack.Screen name="ShippingAddress" component={ShippingAddress} options={{ headerShown: false }}/>
                <Stack.Screen name="TrackOrdersV1" component={TrackOrdersV1} options={{ headerShown: false }}/>
                <Stack.Screen name="TrackOrdersV2" component={TrackOrdersV2} options={{ headerShown: false }}/>
                <Stack.Screen name="AddReviews" component={AddReviews} options={{ headerShown: false }}/>
                <Stack.Screen name="History" component={History} options={{ headerShown: false }}/>
                <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }}/>
                <Stack.Screen name="ShopView" component={ShopView} options={{ headerShown: false }}/>
                <Stack.Screen name="CarByKeywords" component={CarByKeywords} options={{ headerShown: false }}/>
                <Stack.Screen name="ShopView2" component={ShopView2} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation