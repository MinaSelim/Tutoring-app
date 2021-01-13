/* eslint-disable no-undef */
module.exports = {
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
   },
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint'],
   plugins: ['@typescript-eslint', 'prettier'],
   rules: {
      '@typescript-eslint/explicit-function-return-type': 0,
      'no-useless-constructor': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'func-names': ['error', 'always'], // for better debugging (name func. expressions so they are not reported as "anonymous function" in stack trace)
      'no-process-exit': 'off',
      'class-methods-use-this': 'off',
   },

   overrides: [
      {
         files: ['dist/**/*.js', 'dist/*.js'],
         excludedFiles: '*.test.js, package-lock.json, yarn.lock, .eslintrc.js',
         rules: {
            quotes: ['error', 'single'],
         },
      },
   ],
};
