"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";

export const actionProfilePatch = async (input: ProfilePatchSchema.Type) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return {
			success: false,
			message: "You must be signed in to update your profile.",
		} as const;
	}

	const patch = ProfilePatchSchema.safeParse(input);

	if (!patch.success) {
		return {
			success: false,
			message: "Validation failed.",
			errors: z.treeifyError(patch.error),
		} as const;
	}

	await prisma.userProfile.update({
		where: {
			id: session.user.id,
		},
		data: {
			...patch,
			birthday: new Date(patch.data.birthday),
		},
	});

	revalidatePath("/user/profile");

	return {
		success: true,
		message: "Profile updated.",
	} as const;
};
