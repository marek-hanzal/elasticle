import type { FC, ReactNode } from "react";
import { tvc } from "@/lib/tvc";

export namespace FormField {
	export namespace Input {
		export interface Props {
			className: string;
		}

		export type Fn = (props: Props) => ReactNode;
	}

	export interface Props {
		input: Input.Fn;
		field: {
			name: string;
			state: {
				meta: {
					errors:
						| (
								| {
										message: string;
								  }
								| undefined
						  )[]
						| undefined;
				};
			};
		};
	}
}

export const FormField: FC<FormField.Props> = ({ input, field }) => {
	return (
		<div
			className={tvc([
				"space-y-2",
			])}
		>
			<label
				className={tvc([
					"text-sm",
					"font-medium",
				])}
				htmlFor={field.name}
			>
				Name
			</label>
			{input({
				className: tvc([
					"w-full",
					"rounded-xl",
					"border",
					"border-zinc-200",
					"bg-white",
					"px-4",
					"py-2",
					"text-sm",
					"text-zinc-900",
					"outline-none",
					"transition",
					"focus:border-zinc-400",
					"focus:ring-2",
					"focus:ring-zinc-200",
				]),
			})}
			{field.state.meta.errors[0] ? (
				<div
					className={tvc([
						"text-xs",
						"text-red-500",
					])}
				>
					{String(field.state.meta.errors[0].message)}
				</div>
			) : null}
		</div>
	);
};
