// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'no-console': 'off',
      'vue/html-indent': ['error', 2],
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/member-delimiter-style': 'off',
      'vue/html-self-closing': 'off'
    },
  },
);
