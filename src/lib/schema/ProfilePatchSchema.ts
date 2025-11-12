import z from "zod";

const trimString = (value: string) => value.trim();

export const ProfilePatchSchema = z.object({
	name: z.string().min(1, "Please enter your name.").transform(trimString),
	surname: z
		.string()
		.min(1, "Please enter your surname.")
		.transform(trimString),
	photo: z.url().nullish(),
	birthday: z
		.string()
		.min(1, "Please enter your birthday.")
		.transform(trimString),
	bio: z.string().nullish(),
});

export type ProfilePatchSchema = typeof ProfilePatchSchema;

export namespace ProfilePatchSchema {
	export type Type = z.infer<ProfilePatchSchema>;
}
