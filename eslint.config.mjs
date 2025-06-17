// eslint.config.mjs (ESLint v9+ flat config with ignores)
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import n from 'eslint-plugin-n';
import globals from 'globals';
const { node: nodeGlobals } = globals;

export default defineConfig([
  globalIgnores(['**/dist/**', 'packages/create-swivify/**']),
  js.configs.recommended,
  n.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: nodeGlobals,
    },
    plugins: { '@typescript-eslint': tseslint, prettier, n },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: nodeGlobals,
    },
    plugins: { prettier, n },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...nodeGlobals,
        ...globals.jest,
      },
    },
    plugins: { '@typescript-eslint': tseslint, prettier, n },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
]);
