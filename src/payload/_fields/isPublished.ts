import type { Field } from "payload/types";

const IsPublished: Field = {
	name: "published",
	type: "checkbox",
	admin: {
		description: "Toggle to publish the page.",
		width: "50%",
	},
	label: "Published",
};

export default IsPublished;
