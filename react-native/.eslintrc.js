module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
    'react/prefer-stateless-function': 'off',
    'no-useless-constructor': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'func-names': ['warn', 'always'], // for better debugging (name func. expressions so they are not reported as "anonymous function" in stack trace)
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
  },
  reportUnusedDisableDirectives: true,
};
