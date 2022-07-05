module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: 'double',
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowString: false,
        allowNumber: false,,
      },,
    ],
  },
};
