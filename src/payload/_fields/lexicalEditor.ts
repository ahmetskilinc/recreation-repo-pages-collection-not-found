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
			blocks: [
				// Carousel as unknown as LexicalBlock,
				// ImageSlider as unknown as LexicalBlock,
				// ServicesGrid as unknown as LexicalBlock,
				// SimplePageHeading as unknown as LexicalBlock,
				// TextBlock as unknown as LexicalBlock,
				// FormBlock as unknown as LexicalBlock,
				// WhereToFindUs as unknown as LexicalBlock,
				// GoogleReviews as unknown as LexicalBlock,
				// ProductCategories as unknown as LexicalBlock,
				// HeroCarousel as unknown as LexicalBlock,
			],
		}),
	],
});
