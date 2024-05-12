import { slateEditor } from "@payloadcms/richtext-slate";
import type { Field } from "payload/types";

export const hero: Field = {
	name: "hero",
	label: false,
	type: "group",
	fields: [
		{
			type: "select",
			name: "type",
			label: "Type",
			required: true,
			defaultValue: "default",
			options: [
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Content and Media",
					value: "contentMedia",
				},
				{
					label: "Centered Content",
					value: "centeredContent",
				},
				{
					label: "Form",
					value: "form",
				},
				{
					label: "Home",
					value: "home",
				},
				{
					label: "Livestream",
					value: "livestream",
				},
				{
					label: "Gradient",
					value: "gradient",
				},
				{
					label: "3.0",
					value: "three",
				},
			],
		},
		{
			type: "checkbox",
			name: "fullBackground",
			admin: {
				condition: (_, { type } = {}) => type === "gradient",
			},
		},
		{
			name: "enableAnnouncement",
			type: "checkbox",
			admin: {
				condition: (_, { type }) => type === "home",
			},
			label: "Enable Announcement?",
		},
		{
			name: "richText",
			type: "richText",
			admin: {
				condition: (_, { type } = {}) => type !== "livestream",
			},
			editor: slateEditor({
				admin: {
					elements: ["h1", "h2", "h3", "h6", "ul"],
					leaves: ["underline"],
				},
			}),
		},
		{
			name: "description",
			type: "richText",
			admin: {
				condition: (_, { type } = {}) =>
					type !== "livestream" && type !== "centeredContent" && type !== "three",
			},
			editor: slateEditor({
				admin: {
					elements: ["ul", "link"],
					leaves: ["underline"],
				},
			}),
		},
		{
			name: "secondaryHeading",
			type: "richText",
			admin: {
				condition: (_, { type }) => type === "home",
			},
			editor: slateEditor({
				admin: {
					elements: ["h2", "ul"],
					leaves: ["underline"],
				},
			}),
		},
		{
			name: "secondaryDescription",
			type: "richText",
			admin: {
				condition: (_, { type }) => type === "home",
			},
			editor: slateEditor({
				admin: {
					elements: ["ul", "link"],
					leaves: ["underline"],
				},
			}),
		},
		{
			name: "buttons",
			type: "blocks",
			labels: {
				singular: "Button",
				plural: "Buttons",
			},
			admin: {
				condition: (_, { type }) => type === "three",
			},
			blocks: [
				{
					slug: "command",
					labels: {
						singular: "Command Line",
						plural: "Command Lines",
					},
					fields: [
						{
							name: "command",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "images",
			type: "array",
			minRows: 1,
			admin: {
				condition: (_, { type } = {}) => ["gradient"].includes(type),
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				condition: (_, { type } = {}) => ["contentMedia", "home"].includes(type),
			},
		},
		{
			name: "secondaryMedia",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				condition: (_, { type }) => type === "home",
			},
		},
		{
			name: "featureVideo",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				condition: (_, { type }) => type === "home",
			},
		},
		{
			name: "form",
			type: "relationship",
			relationTo: "forms",
			admin: {
				condition: (_, { type }) => type === "form",
			},
		},
		{
			name: "logos",
			type: "array",
			fields: [
				{
					name: "logoMedia",
					label: "Media",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
			admin: {
				condition: (_, { type }) => type === "home",
			},
		},
	],
};
