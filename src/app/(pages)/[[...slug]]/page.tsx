import { Metadata } from "next";
import React from "react";
import ClientPage from "./page.client";
import { notFound } from "next/navigation";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload-config";

export const dynamic = "force-dynamic";

const Page: React.FC<{ params: { slug: string[] } }> = async ({ params: { slug = [""] } }) => {
	const payload = getPayloadHMR({ config });
	const pages = (await payload).find({
		collection: "pages",
		where: {
			slug: { equals: slug.join("/") },
		},
	});

	const page = (await pages).docs[0];

	if (!page) return notFound();

	return <ClientPage page={page} />;
};

export default Page;

export const metadata: Metadata = {
	title: "TEST",
	description: "TEST",
};
