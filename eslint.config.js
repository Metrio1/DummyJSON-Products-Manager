import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const a11yWarnRules = Object.fromEntries(
  Object.entries(jsxA11y.configs.recommended.rules).map(([rule, value]) => {
    if (value === 'off') {
      return [rule, 'off'];
    }
    return [rule, 'warn'];
  }),
);

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...a11yWarnRules,
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
);
