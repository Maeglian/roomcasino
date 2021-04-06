module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:nuxt/recommended',
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
  plugins: ['vue', 'prettier', 'jest'],
  rules: {
    'no-return-assign': 'off',
    'nuxt/no-globals-in-created': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-restricted-globals': 'off',
    'no-mixed-operators': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'guard-for-in': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
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
    'vue/no-v-html': 'off',
    'func-names': 'off',
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
