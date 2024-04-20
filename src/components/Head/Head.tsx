import NextHead from "next/head";

import { BASE_PATH } from "@/config";

export function Head() {
	return (
		<NextHead>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
				key="viewport"
				maximum-scale="1"
			/>
			<link rel="icon" href={`${BASE_PATH}/favicon.svg`} />
		</NextHead>
	);
}
