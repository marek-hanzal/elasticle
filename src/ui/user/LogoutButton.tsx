"use client";

import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useLogoutMutation } from "@/lib/mutation/useLogoutMutation";
import { tvc } from "@/lib/tvc";

export const LogoutButton: FC = () => {
	const router = useRouter();
	const logoutMutation = useLogoutMutation({
		onSuccess: () => {
			router.push("/public/login");
		},
	});

	return (
		<button
			className={tvc([
				"inline-flex",
				"items-center",
				"rounded-xl",
				"border",
				"border-zinc-200",
				"bg-white",
				"px-3",
				"py-2",
				"text-xs",
				"font-medium",
				"text-zinc-700",
				"transition",
				"hover:border-zinc-300",
				"hover:text-zinc-900",
				"disabled:cursor-not-allowed",
				"disabled:opacity-70",
			])}
			type="button"
			onClick={() => {
				void logoutMutation.mutateAsync();
			}}
			disabled={logoutMutation.isPending}
		>
			{logoutMutation.isPending ? "Signing out..." : "Sign out"}
		</button>
	);
};
