import { defineConfig } from "taze";

export default defineConfig({
	includeLocked: true,
	install: true,
	update: true,
	packageMode: {
		next: "patch",
	},
});
