import z from "zod";

export const BioPatchSchema = z.object({
	bio: z.string().nullable(),
});

export type BioPatchSchema = typeof BioPatchSchema;

export namespace BioPatchSchema {
	export type Type = z.infer<BioPatchSchema>;
}
