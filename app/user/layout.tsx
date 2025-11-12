import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { auth } from "@/lib/auth";
import { tvc } from "@/lib/tvc";

export default async function UserLayout({ children }: PropsWithChildren) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/public/login");
	}

	return (
		<div
			className={tvc([
				"flex",
				"min-h-screen",
				"justify-center",
				"bg-zinc-50",
				"font-sans",
				"text-zinc-900",
			])}
		>
			<div
				className={tvc([
					"flex",
					"w-full",
					"max-w-4xl",
					"flex-col",
					"gap-10",
					"px-6",
					"py-16",
				])}
			>
				<div
					className={tvc([
						"space-y-2",
						"border-b",
						"border-zinc-200",
						"pb-6",
					])}
				>
					<div
						className={tvc([
							"text-sm",
							"uppercase",
							"tracking-wide",
							"text-zinc-500",
						])}
					>
						User Area
					</div>
					<div
						className={tvc([
							"text-3xl",
							"font-semibold",
						])}
					>
						Account Overview
					</div>
					<div
						className={tvc([
							"text-sm",
							"text-zinc-600",
						])}
					>
						Manage user-specific pages and settings from here.
					</div>
				</div>
				<div
					className={tvc([
						"grow",
					])}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
