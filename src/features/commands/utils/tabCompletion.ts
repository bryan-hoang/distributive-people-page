import * as bin from "./bin";

export const handleTabCompletion = (
	command: string,
	setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
	const commands = Object.keys(bin).filter((entry) =>
		entry.startsWith(command),
	);

	if (commands.length === 1 && typeof commands[0] !== "undefined") {
		setCommand(commands[0]);
	}
};
