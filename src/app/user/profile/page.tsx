import acceptLanguage from "accept-language";
import type { SerializedEditor } from "lexical";
import { DateTime } from "luxon";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { tvc } from "@/lib/tvc";
import { DetailItem } from "@/ui/DetailItem";
import { PreviewEditor } from "@/ui/editor/PreviewEditor";

export default async function ProfilePage() {
	const requestHeaders = await headers();
	const session = await auth.api.getSession({
		headers: requestHeaders,
	});

	/**
	 * This should not be necessary, but Next does not have clever way how to
	 * provide typed access to data (...hello, TanStack Router!).
	 */
	if (!session) {
		return redirect("/public/login");
	}

	const {
		user: { profile, ...user },
	} = session;

	const locale =
		acceptLanguage.get(requestHeaders.get("accept-language") ?? "en") ??
		"en";

	const details: DetailItem.Props[] = [
		{
			label: "Nickname",
			value: user.name,
		},
		{
			label: "Email",
			value: user?.email ?? "—",
		},
		{
			label: "Name",
			value: profile?.name ?? "—",
		},
		{
			label: "Surname",
			value: profile?.surname ?? "—",
		},
		{
			label: "Birthdate",
			value: profile?.birthday
				? DateTime.fromISO(profile.birthday)
						.setLocale(locale)
						.toLocaleString(DateTime.DATE_SHORT)
				: "—",
		},
	];

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
						Profile
					</div>
					<Link
						className={tvc([
							"text-sm",
							"font-medium",
							"text-blue-600",
							"hover:text-blue-500",
							"transition",
						])}
						href={"/user/profile/edit"}
					>
						Edit profile
					</Link>
				</div>
				<div
					className={tvc([
						"text-sm",
						"text-zinc-600",
					])}
				>
					Review and verify the data we have on file for your account.
				</div>
			</div>
			{profile?.photo ? (
				<div
					className={tvc([
						"flex",
						"justify-center",
					])}
				>
					<img
						className={tvc([
							"h-32",
							"w-32",
							"rounded-full",
							"border",
							"border-zinc-200",
							"object-cover",
							"shadow-sm",
						])}
						src={profile.photo}
						alt={`${profile.name ?? user.name ?? "User"}'s profile photo`}
						loading="lazy"
					/>
				</div>
			) : null}
			<div
				className={tvc([
					"space-y-4",
					"text-sm",
					"text-zinc-600",
				])}
			>
				<div>
					The information below reflects the details associated with
					your account.
				</div>
			</div>
			<div
				className={tvc([
					"grid",
					"grid-cols-1",
					"gap-4",
					"sm:grid-cols-2",
				])}
			>
				{details.map((detail) => (
					<DetailItem
						key={detail.label}
						label={detail.label}
						value={detail.value}
					/>
				))}
			</div>

			<div
				className={tvc([
					"relative",
				])}
			>
				<PreviewEditor
					namespace={"user.bio"}
					placeholder={"Bio not filled"}
					content={
						profile?.bio
							? (JSON.parse(profile.bio) as SerializedEditor)
							: undefined
					}
				/>

				{profile?.id ? (
					<Link
						className={tvc([
							"absolute",
							"right-4",
							"top-4",
							"inline-flex",
							"items-center",
							"rounded-lg",
							"border",
							"border-zinc-200",
							"bg-white/80",
							"px-3",
							"py-1.5",
							"text-xs",
							"font-medium",
							"text-zinc-700",
							"backdrop-blur-sm",
							"transition",
							"hover:border-zinc-300",
							"hover:text-zinc-900",
						])}
						href={"/user/profile/edit/bio"}
					>
						Edit bio
					</Link>
				) : null}
			</div>
		</div>
	);
}
