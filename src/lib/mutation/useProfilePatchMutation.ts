"use client";

import { useMutation } from "@tanstack/react-query";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";
import { actionProfilePatch } from "@/server/profile/actionProfilePatch";
import { actionS3PreSign } from "@/server/s3/actionS3PreSign";

type ProfilePatchMutationVariables = ProfilePatchSchema.Type & {
	photoFile?: File | null;
};

export const useProfilePatchMutation = () => {
	return useMutation({
		mutationKey: [
			"profile",
			"patch",
		],
		async mutationFn(variables: ProfilePatchMutationVariables) {
			const { photoFile, photo, ...rest } = variables;
			let photoUrl = photo;

			if (photoFile) {
				const dot = photoFile.name.lastIndexOf(".");
				const extension =
					dot !== -1 && dot < photoFile.name.length - 1
						? photoFile.name.slice(dot + 1).toLowerCase()
						: "unknown";

				if (!extension) {
					throw new Error(
						"We couldn't detect the file type. Please upload a JPG, PNG, or WEBP image.",
					);
				}

				const upload = await actionS3PreSign(
					"profile/photo",
					extension,
				);

				const uploadResponse = await fetch(upload.url, {
					method: "PUT",
					headers: {
						"Content-Type":
							photoFile.type || "application/octet-stream",
					},
					body: photoFile,
				});

				if (!uploadResponse.ok) {
					throw new Error(
						"Uploading the photo failed. Please try again with a different image.",
					);
				}

				photoUrl = upload.cdn;
			}

			return actionProfilePatch({
				...rest,
				photo: photoUrl,
			});
		},
	});
};
