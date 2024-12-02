module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: ['./tsconfig.json'],
    EXPERIMENTAL_useProjectService: true,
  },
  ignorePatterns: ['dist'],
  rules: {
    'react/props-types': 'off',
    '@typescript-eslint/no-empty-interface': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
