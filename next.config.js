import createDebug from "debug";
import dotenv from "dotenv";
import { object, safeParse, string } from "valibot";

const debug = createDebug("config");

dotenv.config();
dotenv.config({
	path: ".env.local",
	override: true,
});

const EnvSchema = object({
	BASE_PATH: string(),
});

debug(`BASE_PATH: ${process.env.BASE_PATH}`);

let basePath = "";
const result = safeParse(EnvSchema, process.env);

if (result.success) {
	basePath += result.output.BASE_PATH;
} else {
	throw new TypeError("BASH_PATH environment variable is not set");
}

/**
 * The config object that configures Next.js
 *
 * @returns {import('next').NextConfig} The config object.
 */
const nextConfig = () => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const config = {
		basePath,
		output: "export",
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		eslint: {
			ignoreDuringBuilds: true,
		},
		typescript: {
			ignoreBuildErrors: true,
		},
	};
	return config;
};

export default nextConfig;
