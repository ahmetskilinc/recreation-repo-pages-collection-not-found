import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
	content: [
		"./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			gilroy: ["var(--font-gilroy)"],
		},
		extend: {
			screens: {
				xs: "400px",
			},
			colors: {
				primary: "rgb(51, 144, 242)",
				"gray-primary": "#0f0e11",
				"gray-secondary": "#202022",
			},
			animation: {
				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				fourth: "moveHorizontal 40s ease infinite",
				fifth: "moveInCircle 20s ease infinite",
			},
			keyframes: {
				moveHorizontal: {
					"0%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
					"50%": {
						transform: "translateX(50%) translateY(10%)",
					},
					"100%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
				},
				moveInCircle: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"50%": {
						transform: "rotate(180deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
				moveVertical: {
					"0%": {
						transform: "translateY(-50%)",
					},
					"50%": {
						transform: "translateY(50%)",
					},
					"100%": {
						transform: "translateY(-50%)",
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
	],
};

export default config;
