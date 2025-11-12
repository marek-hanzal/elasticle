import z from "zod";

export const RegisterSchema = z.object({
	email: z
		.email("Please enter a valid email.")
		.transform((value) => value.trim()),
	name: z
		.string()
		.min(1, "Please enter your full name.")
		.transform((value) => value.trim()),
	password: z.string().min(8, "Password must be at least 8 characters."),
});

export type RegisterSchema = typeof RegisterSchema;

export namespace RegisterSchema {
	export type Type = z.infer<RegisterSchema>;
}
