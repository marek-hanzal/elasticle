import type { PropsWithChildren } from "react";
import { tvc } from "@/lib/tvc";

export default function PublicLayout({ children }: PropsWithChildren) {
	return (
		<div
			className={tvc([
				"flex",
				"min-h-screen",
				"items-center",
				"justify-center",
				"bg-zinc-100",
				"font-sans",
				"text-zinc-900",
			])}
		>
			<div
				className={tvc([
					"w-full",
					"max-w-md",
					"rounded-3xl",
					"border",
					"border-zinc-200",
					"bg-white",
					"p-10",
					"shadow-lg",
				])}
			>
				<div
					className={tvc([
						"mb-8",
						"space-y-1",
						"text-center",
					])}
				>
					<div
						className={tvc([
							"text-xs",
							"uppercase",
							"tracking-[0.3rem]",
							"text-zinc-500",
						])}
					>
						Welcome
					</div>
					<div
						className={tvc([
							"text-2xl",
							"font-semibold",
						])}
					>
						Start using Elasticle
					</div>
					<div
						className={tvc([
							"text-sm",
							"text-zinc-600",
						])}
					>
						Access your account or create a new one below.
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
