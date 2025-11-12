import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
	appName: "Elasticle",
	database: prismaAdapter(prisma, {
		provider: "mysql",
	}),
	plugins: [
		nextCookies(),
		customSession(async ({ user, session }) => {
			const profile = await prisma.userProfile.findFirst({
				where: {
					userId: user.id,
				},
			});

			return {
				user: {
					...user,
					profile: profile
						? {
								...profile,
								birthday: profile.birthday.toISOString(),
							}
						: undefined,
				},
				session,
			};
		}),
	],
	emailAndPassword: {
		enabled: true,
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
});

export const handlers = toNextJsHandler(auth);
