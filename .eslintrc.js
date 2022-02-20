const OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/no-empty-interface': [
      'off'
    ],
    '@typescript-eslint/no-non-null-assertion': [
      'warn'
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
    '@typescript-eslint/array-type': [
      'warn', { 'default': 'generic' }
    ],
    'object-curly-spacing': OFF,
    'space-before-function-paren': OFF,
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR],
    '@typescript-eslint/explicit-module-boundary-types': OFF
  }
};
