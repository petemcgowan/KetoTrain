module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }]
        "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowString: false,
        allowNumber: false,
      },
    ],
  },
};
