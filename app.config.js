export default {
    expo: {
        name: 'PachaApp',
        slug: 'PachaApp',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        userInterfaceStyle: 'light',
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#1b6708',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            package: 'com.pacha.app',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#1b6708',
            },
            config: {
                googleMaps: {
                    apiKey: process.env.MAPS_API_KEY,
                },
            },
            package: 'com.pacha.app',
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON_ANDROID,
        },
        web: {
            favicon: './assets/images/favicon.png',
        },
        plugins: [
            'expo-font',
            '@react-native-google-signin/google-signin',
            '@react-native-firebase/app',
            '@react-native-firebase/auth',
        ],
        extra: {
            eas: {
                projectId: '2201d7fd-174b-49de-a974-b70e01f45639',
            },
        },
    },
}
