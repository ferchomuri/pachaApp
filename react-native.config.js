module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts"],
  dependencies: {
    "react-native-mmkv": {
      platforms: {
        ios: null, // Si no necesitas configuración específica para iOS
        android: {
          sourceDir: "./node_modules/react-native-mmkv/android",
        },
      },
    },
  },
};
