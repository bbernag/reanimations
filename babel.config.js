module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            '@app': './',
            // "@components": "./components",
            // "@ui": "./ui",
            // "@assets": "./assets",
            // "@constants": "./constants"
          },
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ],
    ],
  };
};
