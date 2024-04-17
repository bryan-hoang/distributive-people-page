/**
 * @file    .stylelint.cjs - Configures stylelint.
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    Apr. 2023
 */

/**
 * @type {import('stylelint').Config}
 */
const config = {
	extends: ["stylelint-config-standard"],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: /tailwind/,
			},
		],
	},
};

export default config;
