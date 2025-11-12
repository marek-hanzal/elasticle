"use client";

import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export namespace useLogoutMutation {
	export interface Props
		extends UseMutationOptions<
			Awaited<ReturnType<typeof authClient.signOut>>,
			Error,
			void
		> {
		//
	}
}

export function useLogoutMutation(options: useLogoutMutation.Props = {}) {
	return useMutation({
		mutationKey: [
			"logout",
		],
		async mutationFn() {
			return authClient.signOut({
				fetchOptions: {
					throw: true,
				},
			});
		},
		...options,
	});
}
