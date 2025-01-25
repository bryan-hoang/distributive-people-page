import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { type JSX, useRef } from "react";

import { Head } from "@/components/Head";

import "@/styles/global.css";

const hackFont = localFont({
	src: "../assets/fonts/Hack-NF.ttf",
	variable: "--font-hack",
	fallback: ["monospace"],
});

function App({ Component, pageProps }: AppProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickAnywhere = () => {
		inputRef.current?.focus();
	};

	return (
		<>
			<Head />
			<main
				className={`text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base ${hackFont.variable} font-mono`}
				onClick={onClickAnywhere}
				onKeyDown={onClickAnywhere}
			>
				<div className="bg-light-background dark:bg-dark-background w-full h-full p-2">
					<Component {...pageProps} inputRef={inputRef} />
				</div>
			</main>
		</>
	);
}

export default App;
