"use client";

import { Page } from "@/payload-types";
import { Fragment } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";

type Props = {
	page: Page;
};

const ClientPage = ({ page }: Props) => {
	const { data } = useLivePreview({
		serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL!,
		depth: 30,
		initialData: page,
	});
	return (
		<div>
			<h1 dangerouslySetInnerHTML={{ __html: data.content ? data.content : "" }} />
		</div>
	);
};

export default ClientPage;
