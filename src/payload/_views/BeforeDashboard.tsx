import React from "react";
import payload from "payload";
import { Card } from "@payloadcms/ui/elements/Card";

type Props = {};

const BeforeDashboard = async (props: Props) => {
	const pages = await payload.find({
		collection: "pages",
	});

	return (
		<div className="dashboard__group">
			<ul className="dashboard__card-list">
				<li>
					<Card title={`${pages.docs.length} Pages`}></Card>
				</li>
			</ul>
		</div>
	);
};

export default BeforeDashboard;
