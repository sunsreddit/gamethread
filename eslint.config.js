export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    ignores: ['docs'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': 0,
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      semi: ['error', 'always'],
    },
  }
];