import type { SerializedEditor } from "lexical";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { tvc } from "@/lib/tvc";
import { BioEdit } from "@/ui/profile/BioEdit";

const parseBio = (bio: string | null | undefined) => {
	if (!bio) {
		return undefined;
	}

	try {
		return JSON.parse(bio) as SerializedEditor;
	} catch {
		return undefined;
	}
};

export default async function ProfileBioEditPage() {
	const requestHeaders = await headers();
	const session = await auth.api.getSession({
		headers: requestHeaders,
	});

	if (!session) {
		return redirect("/public/login");
	}

	const profile = session.user.profile;

	if (!profile?.id) {
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
						"text-2xl",
						"font-semibold",
					])}
				>
					Finish your profile first
				</div>
				<div
					className={tvc([
						"text-sm",
						"text-zinc-600",
					])}
				>
					Please add your basic profile information before writing a
					bio.
				</div>
				<Link
					className={tvc([
						"inline-flex",
						"items-center",
						"justify-center",
						"rounded-xl",
						"bg-zinc-900",
						"px-4",
						"py-2",
						"text-sm",
						"font-medium",
						"text-white",
						"transition",
						"hover:bg-zinc-700",
					])}
					href="/user/profile/edit"
				>
					Update profile details
				</Link>
			</div>
		);
	}

	const bioContent = parseBio(profile.bio);

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
					Edit bio
				</div>

				<Link
					className={tvc([
						"text-sm",
						"font-medium",
						"text-zinc-500",
						"transition",
						"hover:text-zinc-700",
					])}
					href="/user/profile"
				>
					Back to profile
				</Link>
			</div>

			<div
				className={tvc([
					"text-sm",
					"text-zinc-600",
				])}
			>
				Write a short introduction to help others get to know you
				better.
			</div>

			<BioEdit content={bioContent} />
		</div>
	);
}
