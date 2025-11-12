import { useMutation } from "@tanstack/react-query";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";
import { actionProfilePatch } from "@/server/profile/actionProfilePatch";

export const useProfilePatchMutation = () => {
	return useMutation({
		mutationKey: [
			"profile",
			"patch",
		],
		async mutationFn(variables: ProfilePatchSchema.Type) {
			return actionProfilePatch(variables);
		},
	});
};
