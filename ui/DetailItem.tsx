import type { FC } from "react";
import { tvc } from "@/lib/tvc";

export namespace DetailItem {
	export type Props = {
		label: string;
		value: string;
	};
}

export const DetailItem: FC<DetailItem.Props> = ({ label, value }) => {
	return (
		<div
			className={tvc([
				"rounded-2xl",
				"border",
				"border-zinc-200",
				"bg-zinc-50",
				"p-4",
			])}
		>
			<div
				className={tvc([
					"text-xs",
					"uppercase",
					"tracking-wide",
					"text-zinc-500",
				])}
			>
				{label}
			</div>
			<div
				className={tvc([
					"mt-2",
					"text-base",
					"font-medium",
					"text-zinc-900",
				])}
			>
				{value}
			</div>
		</div>
	);
};
