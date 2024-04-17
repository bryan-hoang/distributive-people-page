import NextHead from "next/head";

import nextConfig from "@/../next.config";

export function Head() {
	return (
		<NextHead>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
				key="viewport"
				maximum-scale="1"
			/>
			<link rel="icon" href={`${nextConfig.basePath}/favicon.ico`} />
		</NextHead>
	);
}
