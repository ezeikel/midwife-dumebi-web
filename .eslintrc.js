module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended", "next"],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/state-in-constructor": 0,
    "no-console": [2, { allow: ["warn", "error"] }],
    "react/function-component-definition": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "jsx-a11y/anchor-is-valid": [
      2,
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
  overrides: [
    {
      files: "**/*.ts?(x)",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: ["airbnb-typescript", "plugin:prettier/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "./components/**/*.test.tsx",
              "./components/**/*.stories.tsx",
            ],
          },
        ],
      },
    },
  ],
};
