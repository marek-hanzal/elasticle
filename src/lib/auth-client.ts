import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const authClient = createAuthClient({
	baseURL,
	plugins: [
		customSessionClient<typeof auth>(),
	],
});

export namespace authClient {
	export type Session = typeof authClient.$Infer.Session.session;
	export type User = typeof authClient.$Infer.Session.user;
}
