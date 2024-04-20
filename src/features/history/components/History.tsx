import { Interweave } from "interweave";
import { polyfill } from "interweave-ssr";

import { Ps1 } from "@/features/cli";
import type { History as HistoryInterface } from "../types";

polyfill();

type HistoryProps = {
	history: HistoryInterface[];
};

export function History({ history }: HistoryProps): JSX.Element {
	return (
		<>
			{history.map((entry) => (
				<div key={entry.command}>
					<div className="flex flex-row space-x-2">
						<div className="flex-shrink">
							<Ps1 />
						</div>
						<div className="flex-grow">{entry.command}</div>
					</div>
					<Interweave
						content={`<div class="whitespace-pre-wrap mb-2 leading-4">${entry.output}</div>`}
					/>
				</div>
			))}
		</>
	);
}
