import { tvc } from "@/lib/tvc";

export default function ProfilePage() {
	return (
		<div
			className={tvc([
				"space-y-6",
				"rounded-3xl",
				"border",
				"border-zinc-200",
				"bg-white",
				"p-8",
				"shadow-sm",
			])}
		>
			<div>
				<div
					className={tvc([
						"text-2xl",
						"font-semibold",
					])}
				>
					Profile
				</div>
				<div
					className={tvc([
						"text-sm",
						"text-zinc-600",
					])}
				>
					This area will soon show the details of the currently
					signed-in user.
				</div>
			</div>
			<div
				className={tvc([
					"space-y-4",
					"text-sm",
					"text-zinc-600",
				])}
			>
				<div>
					We&apos;re starting with a simple placeholder. Connect this
					page to your authentication logic to surface personal info
					such as name, email and account status.
				</div>
				<div>
					Need to expand? Consider adding tabs for settings, security
					and billing inside this user route.
				</div>
			</div>
		</div>
	);
}
