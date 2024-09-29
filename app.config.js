/* eslint-disable no-undef */
import 'dotenv/config';

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
      bundleIdentifier: 'com.pacha.app',
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#1b6708',
      },
      config: {
        googleMaps: {
          apiKey: '1111-2222-3333-4444',
        },
      },
      package: 'com.pacha.app',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-font',
      '@react-native-google-signin/google-signin',
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      'expo-build-properties',
      // [
      //   'expo-build-properties',
      //   {
      //     ios: {
      //       newArchEnabled: true,
      //     },
      //     android: {
      //       newArchEnabled: true,
      //     },
      //   },
      // ],
    ],
    extra: {
      eas: {
        projectId: '2201d7fd-174b-49de-a974-b70e01f45639',
      },
    },
    jsEngine: 'jsc',
  },
};
