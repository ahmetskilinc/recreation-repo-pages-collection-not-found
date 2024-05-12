import { Viewport } from "next";
import "./globals.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head></head>
			<body className="bg-gray-primary overflow-x-hidden">{children}</body>
		</html>
	);
}

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#0f0e11",
	initialScale: 1,
	width: "device-width",
};
