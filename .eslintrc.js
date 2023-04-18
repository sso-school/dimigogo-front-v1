module.exports = {
  env: { es6: true, node: true },
  extends: ["@react-native-community", "eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react", "import"],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react-native/no-inline-styles": "off",
    "no-unused-vars": "warn",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always-and-inside-groups",
      },
    ],
  },
};
