import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      ...compat.extends('airbnb'),
      js.configs.recommended, 
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
            jsx: true //Allows for the parsing of JSX
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
