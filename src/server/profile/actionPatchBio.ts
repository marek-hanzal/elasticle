"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BioPatchSchema } from "@/lib/schema/BioPatchSchema";

export const actionPatchBio = async (input: BioPatchSchema.Type) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return {
			success: false,
			message: "You must be signed in to update your bio.",
		};
	}

	const parsed = BioPatchSchema.safeParse(input);

	if (!parsed.success) {
		return {
			success: false,
			message: "Validation failed.",
		};
	}

	try {
		await prisma.userProfile.update({
			where: {
				userId: session.user.id,
			},
			data: {
				bio: parsed.data.bio,
			},
		});
	} catch {
		return {
			success: false,
			message:
				"Profile not found. Complete your profile before adding a bio.",
		};
	}

	revalidatePath("/user/profile");

	return {
		success: true,
		message: "Bio updated.",
	};
};
