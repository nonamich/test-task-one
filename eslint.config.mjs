import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescriptEslint from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config}
 * */
export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
    ignores: ['dist', 'node_modules'],
  },
];
