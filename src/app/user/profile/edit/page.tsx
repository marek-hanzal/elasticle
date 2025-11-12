import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { tvc } from "@/lib/tvc";
import { ProfilePatchForm } from "@/ui/profile/ProfilePatchForm";

export default async function ProfileEditPage() {
	const requestHeaders = await headers();
	const session = await auth.api.getSession({
		headers: requestHeaders,
	});

	if (!session) {
		return redirect("/public/login");
	}

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
			<div
				className={tvc([
					"flex",
					"items-center",
					"justify-between",
					"gap-3",
				])}
			>
				<div
					className={tvc([
						"text-2xl",
						"font-semibold",
					])}
				>
					Edit profile
				</div>
				<Link
					className={tvc([
						"text-sm",
						"font-medium",
						"text-zinc-500",
						"transition",
						"hover:text-zinc-700",
					])}
					href={"/user/profile"}
				>
					Cancel
				</Link>
			</div>
			<div
				className={tvc([
					"text-sm",
					"text-zinc-600",
				])}
			>
				Update your personal details and keep your profile information
				up to date.
			</div>
			<ProfilePatchForm
				defaultValues={
					session.user.profile ?? {
						name: "",
						surname: "",
						birthday: "",
					}
				}
			/>
		</div>
	);
}
