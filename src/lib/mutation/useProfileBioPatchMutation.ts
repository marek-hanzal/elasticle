import { useMutation } from "@tanstack/react-query";
import { actionPatchBio } from "@/server/profile/actionPatchBio";

export const useProfileBioPatchMutation = () => {
	return useMutation({
		mutationKey: [
			"profile",
			"bio",
			"patch",
		],
		mutationFn: actionPatchBio,
	});
};
