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

	try {
		await prisma.userProfile.update({
			where: {
				userId: session.user.id,
			},
			data: {
				...patch.data,
				birthday: patch.data.birthday
					? new Date(patch.data.birthday)
					: undefined,
			},
		});
	} catch {
		await prisma.userProfile.create({
			data: {
				userId: session.user.id,
				name: patch.data.name,
				surname: patch.data.surname,
				birthday: new Date(patch.data.birthday),
				bio: patch.data.bio,
			},
		});
	}

	revalidatePath("/user/profile");

	return {
		success: true,
		message: "Profile updated.",
	} as const;
};
