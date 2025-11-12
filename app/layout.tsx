import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { QueryProvider } from "./query-provider";

export const metadata: Metadata = {
	title: "Elasticle",
	description: "Elasticle interview project",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
