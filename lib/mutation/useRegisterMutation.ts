"use client";

import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import type { RegisterSchema } from "@/lib/schema/RegisterSchema";

export namespace useRegisterMutation {
	export interface Props
		extends UseMutationOptions<
			ReturnType<typeof authClient.signUp.email>,
			Error,
			RegisterSchema.Type
		> {
		//
	}
}

export function useRegisterMutation(options: useRegisterMutation.Props = {}) {
	return useMutation({
		async mutationFn(variables) {
			return authClient.signUp.email(variables);
		},
		...options,
	});
}
