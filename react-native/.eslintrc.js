module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'react/jsx-props-no-spreading': 'warn',
    'no-unused-expressions': ['error', {allowTernary: true}],
    'react/jsx-closing-bracket-location': 'off',
    'react/prop-types': ['error', {ignore: ['navigation']}],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react/destructuring-assignment': 'off',
    'no-param-reassign': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
    'react/prefer-stateless-function': 'off',
    'no-useless-constructor': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'func-names': ['warn', 'always'], // for better debugging (name func. expressions so they are not reported as "anonymous function" in stack trace)
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },

  reportUnusedDisableDirectives: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      typescript: {},
    },
  },
};
