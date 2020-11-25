module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue',
    'plugin:prettier-vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-restricted-globals': 'off',
    'no-mixed-operators': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'guard-for-in': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'no-unused-expressions': 'off',
    'no-shadow': [
      'error',
      {
        allow: ['state'],
      },
    ],
  },
  settings: {
    'import/core-modules': ['vue', 'vuex'],
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};
