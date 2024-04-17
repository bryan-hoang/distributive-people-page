import { Ps1 } from "@/features/cli";
import type { History as HistoryInterface } from "../types";

type HistoryProps = {
	history: HistoryInterface[];
};

export function History({ history }: HistoryProps): JSX.Element {
	return (
		<>
			{history.map((entry, index) => (
				<div key={entry.command + index}>
					<div className="flex flex-row space-x-2">
						<div className="flex-shrink">
							<Ps1 />
						</div>
						<div className="flex-grow">{entry.command}</div>
					</div>
					<p
						className="whitespace-pre-wrap mb-2"
						style={{ lineHeight: "normal" }}
						dangerouslySetInnerHTML={{ __html: entry.output }}
					/>
				</div>
			))}
		</>
	);
}
