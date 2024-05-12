import { isAdmin } from "@/access/isAdmin";
import { publishedOnly } from "@/access/publishedOnly";
import content from "@/fields/content";
import { fullTitle } from "@/fields/fullTitle";
import { hero } from "@/fields/hero";
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
		useAsTitle: "fullTitle",
		defaultColumns: ["fullTitle", "slug", "createdAt", "updatedAt"],
		// TODO: CUSTOM TABS
		// components: {
		// 	views: {
		// 		Edit: {
		// 			Test: {
		// 				Component: Test,
		// 				path: "/test",
		// 				Tab: {
		// 					label: "Test",
		// 					href: "/test",
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	},

	timestamps: true,
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "General",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
						slugField(),
					],
				},
				{
					label: "Hero",
					fields: [hero],
				},
				{
					label: "Content",
					fields: [content],
				},
			],
		},
		fullTitle,
	],
};

export default Pages;
