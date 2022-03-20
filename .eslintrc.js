module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "jsx-a11y", "prettier", "react"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:jsx-a11y/recommended",
		"plugin:react/recommended",
	],
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"react/jsx-key": "error",
		"react/react-in-jsx-scope": "off",
	},
};
