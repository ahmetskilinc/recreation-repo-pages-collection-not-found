import Media from "@/collections/Media";
import Pages from "@/collections/Pages";
import Users from "@/collections/Users";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload/config";
import sharp from "sharp";
import { fileURLToPath } from "url";
import BeforeDashboard from "./payload/_views/BeforeDashboard";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	admin: {
		components: {
			beforeDashboard: [BeforeDashboard],
		},
	},
	db: mongooseAdapter({
		url: process.env.MONGODB_URI || "",
	}),
	collections: [Users, Pages, Media],
	plugins: [
		...(process.env.NODE_ENV === "production"
			? [
					vercelBlobStorage({
						collections: {
							[Media.slug]: true,
						},
						token: process.env.BLOB_READ_WRITE_TOKEN!,
					}),
			  ]
			: []),
		seoPlugin({
			collections: ["pages"],
			uploadsCollection: "media",
			tabbedUI: true,
		}),
		formBuilderPlugin({
			fields: {
				country: false,
				payment: false,
				state: false,
			},
		}),
		nestedDocsPlugin({
			collections: ["pages"],
			generateLabel: (_, doc) => doc.title as string,
			generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
		}),
		redirectsPlugin({
			collections: ["pages"],
		}),
	],
	sharp,
});
