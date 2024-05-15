import { isAdmin } from "@/access/isAdmin";
import { publishedOnly } from "@/access/publishedOnly";
import content from "@/fields/content";
import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload/types";

const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "Page",
		plural: "Pages",
	},
	access: {
		create: isAdmin,
		read: publishedOnly,
		readVersions: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	versions: {
		drafts: true,
	},
	admin: {
		useAsTitle: "sllug",
		defaultColumns: ["slug", "createdAt", "updatedAt"],
		livePreview: {
			breakpoints: [
				{
					name: "mobile",
					height: 764,
					label: "Mobile",
					width: 430,
				},
			],
			url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${data.slug}`,
		},
	},

	timestamps: true,
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [slugField(), content],
				},
			],
		},
	],
};

export default Pages;
