import { PrismaClient } from "@prisma/client";

type GlobalWithPrisma = typeof globalThis & {
	prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

/**
 * A lot of stuff, because of dev hot reloads to prevent multiple instances of the client
 */
export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development"
				? [
						"error",
						"warn",
					]
				: [
						"error",
					],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
