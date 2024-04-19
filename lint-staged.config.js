/**
 * @type {import('lint-staged').Config}
 */
const config = {
	"*": (_files) => {
		return "pnpm run format --write";
	},
	"*.{ts,tsx,js,mjs,cjs}": (_files) => {
		return "pnpm run lint:scripts --apply";
	},
	"*.{ts,tsx}": (_files) => {
		return "pnpm run typecheck";
	},
	"*.css": (_files) => {
		return "pnpm run lint:styles --fix";
	},
};

export default config;
