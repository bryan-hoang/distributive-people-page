import { useCallback, useState } from 'react';

import { History } from '../types';

export const useHistory = (defaultValue: Array<History>) => {
	const [history, setHistory] = useState<Array<History>>(defaultValue);
	const [command, setCommand] = useState<string>('');
	const [lastCommandIndex, setLastCommandIndex] = useState<number>(0);

	const setHistoryCallback = useCallback(
		(value: string) => {
			setHistory((previousHistory) => {
				return previousHistory.concat({
					command,
					id: previousHistory.length,
					date: new Date(),
					output: value,
				});
			});
		},
		[command],
	);

	return {
		history,
		command,
		lastCommandIndex,
		setHistory: setHistoryCallback,
		setCommand,
		setLastCommandIndex,
		clearHistory: () => setHistory([]),
	};
};
