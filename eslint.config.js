import js from '@eslint/js';
import reactPluginNext from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactPluginCompiler from 'eslint-plugin-react-compiler';
import reactPluginHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config(
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      prettierPlugin,
      importPlugin.flatConfigs.recommended,
      sonarjs.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactPluginHooks,
      'react-compiler': reactPluginCompiler,
      '@next/next': reactPluginNext,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactPluginHooks.configs.recommended.rules,
      ...reactPluginNext.configs.recommended.rules,
      ...reactPluginNext.configs['core-web-vitals'].rules,
      'react-compiler/react-compiler': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      'import/namespace': ['error', { allowComputed: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
      },
    },
  }
);
