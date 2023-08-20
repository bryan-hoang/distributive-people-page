/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
	extends: ['next/core-web-vitals'],
	// Include config dot files by default.
	ignorePatterns: ['!.*'],
	rules: {
		'sort-imports': [
			'error',
			{
				allowSeparatedGroups: true,
			},
		],
	},
};

module.exports = config;
