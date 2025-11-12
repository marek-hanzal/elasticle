import z from "zod";

export const LoginSchema = z.object({
	email: z
		.email("Please enter a valid email.")
		.transform((value) => value.trim()),
	password: z.string().min(1, "Please enter your password."),
});

export type LoginSchema = typeof LoginSchema;

export namespace LoginSchema {
	export type Type = z.infer<LoginSchema>;
}
