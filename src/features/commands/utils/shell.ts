import { Dispatch, SetStateAction } from 'react';

import * as bin from './bin';

export const shell = async (
	command: string,
	setHistory: (value: string) => void,
	clearHistory: () => void,
	setCommand: Dispatch<SetStateAction<string>>,
) => {
	const args = command.split(' ');
	args[0] = (args[0] as string).toLowerCase();

	if (args[0] === 'clear') {
		clearHistory();
	} else if (command === '') {
		setHistory('');
	} else if (Object.keys(bin).indexOf(args[0]) === -1) {
		setHistory(
			`shell: command not found: ${args[0]}. Try 'help' to get started.`,
		);
	} else {
		// https://github.com/microsoft/TypeScript/issues/10998#issuecomment-248163332
		const output = await (<any>bin)[args[0]](args.slice(1));
		setHistory(output);
	}

	setCommand('');
};
