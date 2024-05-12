import type { Field } from "payload/types";

import lexicalEditor from "./lexicalEditor";

const content: Field = {
	name: "content",
	type: "richText",
	editor: lexicalEditor,
};

export default content;
