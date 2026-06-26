import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
    js.configs.recommended,
    {
        files: ["**/*.jsx", "**/*.js"],
        plugins: {
            react: react
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                window: "readonly",
                document: "readonly",
                localStorage: "readonly",
                console: "readonly",
                process: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                IntersectionObserver: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "off",
            "no-undef": "error",
            "no-empty": "off"
        }
    }
];
