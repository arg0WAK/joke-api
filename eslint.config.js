// eslint.config.js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],

            "no-unused-vars": "warn",
        },
        ignores: ["node_modules/"],
    },
];
