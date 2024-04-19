import { useIsFirstRender } from "@uidotdev/usehooks";
import Head from "next/head";
import { useEffect, useRef } from "react";

import { InputField } from "@/features/cli";
import { banner } from "@/features/commands";
import { History } from "@/features/history";
import { useHistory } from "@/features/history";

import config from "@/config/config.json";

type IndexPageProps = {
	inputRef: React.MutableRefObject<HTMLInputElement>;
};

function IndexPage({ inputRef }: IndexPageProps): JSX.Element {
	const containerRef = useRef<HTMLDivElement>(null);
	const isFirstRender = useIsFirstRender();
	const {
		history,
		command,
		lastCommandIndex,
		setCommand,
		setHistory,
		clearHistory,
		setLastCommandIndex,
	} = useHistory([]);

	if (isFirstRender) {
		setHistory(banner());
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView();
			inputRef.current.focus({ preventScroll: true });
		}
	}, [inputRef]);

	return (
		<>
			<Head>
				<title>{config.title}</title>
			</Head>

			<div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
				<div ref={containerRef} className="overflow-y-auto h-full">
					<History history={history} />

					<InputField
						inputRef={inputRef}
						containerRef={containerRef}
						command={command}
						history={history}
						lastCommandIndex={lastCommandIndex}
						setCommand={setCommand}
						setHistory={setHistory}
						setLastCommandIndex={setLastCommandIndex}
						clearHistory={clearHistory}
					/>
				</div>
			</div>
		</>
	);
}

export default IndexPage;
