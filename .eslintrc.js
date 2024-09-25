module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Ajoutez vos règles personnalisées ici
    // Exemple :
    // 'semi': ['error', 'always'],
    // '@typescript-eslint/no-unused-vars': ['error'],
  },
  env: {
    node: true,
    es6: true,
  },
};
