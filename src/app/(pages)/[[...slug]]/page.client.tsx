"use client";

import Lexical from "@/components/Lexical";
import { Page } from "@/payload-types";
import { Fragment } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { cn } from "@/lib/cn";

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
		<Fragment>
			<section className={cn("max-w-7xl mx-auto")}>
				<div className="p-6 xs:p-8 md:p-12 md:pt-0">
					<Lexical content={data.content} />
				</div>
			</section>
		</Fragment>
	);
};

export default ClientPage;
