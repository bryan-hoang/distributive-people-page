import type {
	ChangeEvent,
	Dispatch,
	JSX,
	KeyboardEvent,
	MutableRefObject,
	RefObject,
	SetStateAction,
} from "react";

import { commandExists, handleTabCompletion, shell } from "@/features/commands";
import type { History } from "@/features/history/types";
import { Ps1 } from "./Ps1";

type InputFieldProps = {
	inputRef: MutableRefObject<HTMLInputElement>;
	containerRef: RefObject<HTMLDivElement | null>;
	command: string;
	setCommand: Dispatch<SetStateAction<string>>;
	lastCommandIndex: number;
	setLastCommandIndex: Dispatch<SetStateAction<number>>;
	history: History[];
	setHistory: (value: string) => void;
	clearHistory: () => void;
};

export function InputField({
	inputRef,
	containerRef,
	command,
	history,
	lastCommandIndex,
	setCommand,
	setHistory,
	setLastCommandIndex,
	clearHistory,
}: InputFieldProps): JSX.Element {
	const onSubmit = async (event: KeyboardEvent<HTMLInputElement>) => {
		const commands = history
			.map(({ command }) => command)
			.filter((command: string) => command);

		if (event.key === "c" && event.ctrlKey) {
			event.preventDefault();
			setCommand("");
			setHistory("");
			setLastCommandIndex(0);
		}

		if (event.ctrlKey && event.key === "u") {
			event.preventDefault();
			setCommand("");
		}

		if (event.key === "l" && event.ctrlKey) {
			event.preventDefault();
			clearHistory();
		}

		if (event.key === "Tab") {
			event.preventDefault();
			handleTabCompletion(command, setCommand);
		}

		if (
			event.key === "Enter" ||
			event.code === "13" ||
			(event.ctrlKey && event.key === "m")
		) {
			event.preventDefault();
			setLastCommandIndex(0);
			await shell(command, setHistory, clearHistory, setCommand);
			containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
		}

		if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
			event.preventDefault();
			if (!commands.length) {
				return;
			}
			const index: number = lastCommandIndex + 1;
			if (index <= commands.length) {
				setLastCommandIndex(index);
				setCommand(commands[commands.length - index] as string);
			}
		}

		if (event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
			event.preventDefault();
			if (!commands.length) {
				return;
			}
			const index: number = lastCommandIndex - 1;
			if (index > 0) {
				setLastCommandIndex(index);
				setCommand(commands[commands.length - index] as string);
			} else {
				setLastCommandIndex(0);
				setCommand("");
			}
		}
	};

	const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setCommand(value);
	};

	return (
		<div className="flex flex-row space-x-2">
			<label htmlFor="prompt" className="shrink">
				<Ps1 />
			</label>

			<input
				ref={inputRef}
				id="prompt"
				type="text"
				className={`bg-light-background dark:bg-dark-background focus:outline-hidden grow ${
					commandExists(command) || command === ""
						? "text-dark-green"
						: "text-dark-red"
				}`}
				value={command}
				onChange={onChange}
				onKeyDown={onSubmit}
				autoComplete="off"
				spellCheck="false"
			/>
		</div>
	);
}
