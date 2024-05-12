import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		formats: ["image/webp"],
	},
	async headers() {
		return [
			{
				source: "/:all*(svg|jpg|png|webp|ico)",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, must-revalidate",
					},
				],
			},
		];
	},
};

export default withPayload(nextConfig);
