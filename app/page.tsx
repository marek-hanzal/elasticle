import { tvc } from "@/lib/tvc";

export default function Home() {
	return (
		<div
			className={tvc([
				"flex",
				"min-h-screen",
				"items-center",
				"justify-center",
				"bg-zinc-50",
				"font-sans",
			])}
		>
			<div
				className={tvc([
					"flex",
					"min-h-screen",
					"w-full",
					"max-w-3xl",
					"flex-col",
					"items-center",
					"justify-between",
					"py-32",
					"px-16",
					"bg-white",
				])}
			>
				Bello! - just testing deployment
			</div>
		</div>
	);
}
