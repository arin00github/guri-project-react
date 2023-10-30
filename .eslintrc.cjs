module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint','prettier', 'import'],
  rules: {
    "import/order": [
      "error",
      {
          alphabetize: {
              order: "asc",
              caseInsensitive: true,
          },
          "newlines-between": "always",
          groups: ["builtin", "external", "parent", "sibling", "index"],
          pathGroups: [
              {
                  pattern: "react",
                  group: "external",
                  position: "before",
              },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
      },
  ],
  "prettier/prettier": [
      "error",
      {
          endOfLine: "auto",
      },
  ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
