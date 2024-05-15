import {
	BlocksFeature,
	LinkFeature,
	UploadFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

export default lexicalEditor({
	features: ({ defaultFeatures }) => [
		...defaultFeatures,
		LinkFeature({
			fields: [
				{
					name: "rel",
					type: "select",
					admin: {
						description:
							"The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.",
					},
					hasMany: true,
					label: "Rel Attribute",
					options: ["noopener", "noreferrer", "nofollow"],
				},
			],
		}),
		UploadFeature({
			collections: {
				uploads: {
					fields: [
						{
							name: "caption",
							type: "richText",
							editor: lexicalEditor({}),
						},
					],
				},
			},
		}),
		BlocksFeature({
			blocks: [],
		}),
	],
});
