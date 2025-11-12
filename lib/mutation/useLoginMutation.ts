"use client";

import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import type { LoginSchema } from "@/lib/schema/LoginSchema";

export namespace useLoginMutation {
	export interface Props
		extends UseMutationOptions<
			ReturnType<typeof authClient.signIn.email>,
			Error,
			LoginSchema.Type
		> {
		//
	}
}

export function useLoginMutation(options: useLoginMutation.Props = {}) {
	return useMutation({
		mutationKey: [
			"login",
		],
		async mutationFn(variables) {
			return authClient.signIn.email({
				...variables,
				rememberMe: true,
				fetchOptions: {
					throw: true,
				},
			});
		},
		...options,
	});
}
