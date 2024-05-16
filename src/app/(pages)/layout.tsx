import { Viewport } from "next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head></head>
			<body>{children}</body>
		</html>
	);
}

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
};
