"use server";

import { createId } from "@paralleldrive/cuid2";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AppEnv } from "@/server/AppEnv";
import { s3 } from "@/server/s3";

export const actionS3PreSign = async (path: string, extension: string) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("You must be signed in to upload a file.");
	}

	const key = `elasticle-${session.user.id}/${path}/${createId()}.${extension}`;

	return {
		url: await s3.presignedPutObject(AppEnv.SERVER_S3_BUCKET, key, 60 * 30),
		cdn: `${AppEnv.SERVER_CONTENT_CDN}/${key}`,
	};
};
