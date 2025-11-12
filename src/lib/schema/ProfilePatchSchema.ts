import z from "zod";

const trimString = (value: string) => value.trim();

export const ProfilePatchSchema = z
	.object({
		nickname: z
			.string()
			.min(1, "Please enter your nickname.")
			.transform(trimString),
		name: z
			.string()
			.min(1, "Please enter your name.")
			.transform(trimString),
		surname: z
			.string()
			.min(1, "Please enter your surname.")
			.transform(trimString),
		birthday: z.date(),
		bio: z.string().nullable(),
	})
	.partial();

export type ProfilePatchSchema = typeof ProfilePatchSchema;

export namespace ProfilePatchSchema {
	export type Type = z.infer<ProfilePatchSchema>;
}
