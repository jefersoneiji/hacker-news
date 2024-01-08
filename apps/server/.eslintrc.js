module.exports = {
    root: true,
    env: {
        browser: false,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'nexus-typegen.ts'],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
}