import type { Config } from 'tailwindcss';

import { colors } from './config.json';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/features/*/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			...colors,
		},
		extend: {
			fontFamily: {
				mono: ['var(--font-hack)'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

export default config;
