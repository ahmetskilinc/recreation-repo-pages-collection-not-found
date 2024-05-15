"use client";

import classNames from "classnames";
import React from "react";
import { Page } from "@/payload-types";
import { CustomSerializedLexicalNode, Serialize } from "./serialize";

const Lexical: React.FC<{
	className?: string;
	content: Page["content"];
}> = ({ className, content }) => {
	if (!content) {
		return null;
	}

	return (
		<div className={classNames(className, " max-w-none")}>
			<Serialize nodes={content.root.children as CustomSerializedLexicalNode[]} />
		</div>
	);
};

export default Lexical;
