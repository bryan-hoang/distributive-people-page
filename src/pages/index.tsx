import { useEffect, useRef } from 'react';
import Head from 'next/head';

import { History } from '@/features/history';
import { InputField } from '@/features/cli';
import { banner } from '@/features/commands';
import { useHistory } from '@/features/history';

import config from '@/../config.json';

interface IndexPageProps {
	inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
	const containerRef = useRef(null);
	const {
		history,
		command,
		lastCommandIndex,
		setCommand,
		setHistory,
		clearHistory,
		setLastCommandIndex,
	} = useHistory([]);

	useEffect(() => {
		setHistory(banner());

		return () => {
			clearHistory();
		};

		// Only run once on mount.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView();
			inputRef.current.focus({ preventScroll: true });
		}
	}, [history, inputRef]);

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
};

export default IndexPage;
