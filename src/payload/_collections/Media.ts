import { CollectionConfig } from "payload/types";
import { MediaList } from "../_views/TestMediaList";

const Media: CollectionConfig = {
	slug: "media",
	labels: {
		plural: "Media",
		singular: "Media",
	},
	access: {
		read: () => true,
	},
	admin: {
		// components: {
		// 	views: {
		// 		List: {
		// 			Component: MediaList,
		// 		},
		// 	},
		// },
	},
	fields: [
		{
			name: "alt",
			type: "text",
		},
	],
	upload: {
		disableLocalStorage: false,
		staticDir: "media",
		mimeTypes: ["image/*", "video/*"],
	},
};

export default Media;
