module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended'
	],
	parserOptions: {
		project: './tsconfig.json',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
    '@typescript-eslint/indent': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'react/prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/display-name': 0,
  }
};

