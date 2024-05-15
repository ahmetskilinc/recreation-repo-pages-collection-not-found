import type { SerializedListItemNode, SerializedListNode } from "@lexical/list";
import type { SerializedHeadingNode, SerializedQuoteNode } from "@lexical/rich-text";
import type { LinkFields, SerializedLinkNode } from "@payloadcms/richtext-lexical";
import escapeHTML from "escape-html";
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from "lexical";
import { Page } from "@/payload-types";
import {
	IS_BOLD,
	IS_CODE,
	IS_ITALIC,
	IS_STRIKETHROUGH,
	IS_SUBSCRIPT,
	IS_SUPERSCRIPT,
	IS_UNDERLINE,
} from "./nodeFormat";
import React from "react";

export type CustomSerializedLexicalNode = SerializedLexicalNode & {
	fields: any;
	language: string;
	children: {
		[x: string]:
			| string
			| number
			| boolean
			| React.ReactElement<any, string | React.JSXElementConstructor<any>>
			| Iterable<React.ReactNode>
			| React.ReactPortal
			| null
			| undefined;
		type: string;
		mode: any;
		highlightType: any;
	}[];
	value?: Page;
};

interface Props {
	nodes: CustomSerializedLexicalNode[];
	disableTopPadding?: boolean;
}

export function Serialize({ nodes }: Props): JSX.Element {
	return (
		<>
			{nodes?.map((_node, index): JSX.Element | null => {
				if (_node.type === "text") {
					const node = _node as SerializedLexicalNode as SerializedTextNode;
					let text = (
						<span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={index} />
					);
					if (node.format & IS_BOLD) {
						text = <strong key={index}>{text}</strong>;
					}
					if (node.format & IS_ITALIC) {
						text = <em key={index}>{text}</em>;
					}
					if (node.format & IS_STRIKETHROUGH) {
						text = (
							<span className="line-through" key={index}>
								{text}
							</span>
						);
					}
					if (node.format & IS_UNDERLINE) {
						text = (
							<span className="underline" key={index}>
								{text}
							</span>
						);
					}
					if (node.format & IS_CODE) {
						text = <code key={index}>{text}</code>;
					}
					if (node.format & IS_SUBSCRIPT) {
						text = <sub key={index}>{text}</sub>;
					}
					if (node.format & IS_SUPERSCRIPT) {
						text = <sup key={index}>{text}</sup>;
					}

					return text;
				}

				if (_node.type === "relationship") {
					// return <Relationship key={index} {...(_node.value as Page)} />;
					return null;
				}

				if (_node == null) {
					return null;
				}

				const serializedChildrenFn = (node: SerializedElementNode): JSX.Element | null => {
					if (node.children == null) {
						return null;
					} else {
						if (node?.type === "list" && (node as SerializedListNode)?.listType === "check") {
							for (const item of node.children) {
								if ("checked" in item) {
									if (!item?.checked) {
										item.checked = false;
									}
								}
							}
							return Serialize({
								nodes: node.children as CustomSerializedLexicalNode[],
							});
						} else {
							return Serialize({
								nodes: node.children as CustomSerializedLexicalNode[],
							});
						}
					}
				};

				const serializedChildren =
					"children" in _node
						? serializedChildrenFn(_node as SerializedLexicalNode as SerializedElementNode)
						: "";

				switch (_node.type) {
					case "linebreak": {
						return <br key={index} />;
					}
					case "paragraph": {
						return (
							<p className="container mx-auto px-6 md:px-0" key={index}>
								{serializedChildren}
							</p>
						);
					}
					case "heading": {
						const node = _node as SerializedLexicalNode as SerializedHeadingNode;

						type Heading = Extract<keyof JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5">;
						const Tag = node?.tag as Heading;
						return (
							<Tag className="container mx-auto px-6 md:px-0" key={index}>
								{serializedChildren}
							</Tag>
						);
					}
					case "list": {
						const node = _node as SerializedLexicalNode as SerializedListNode;

						type List = Extract<keyof JSX.IntrinsicElements, "ol" | "ul">;
						const Tag = node?.tag as List;
						return (
							<Tag className={`${node?.listType} container mx-auto px-6 md:px-0`} key={index}>
								{serializedChildren}
							</Tag>
						);
					}
					case "listitem": {
						const node = _node as SerializedLexicalNode as SerializedListItemNode;
						return (
							<li key={index} value={node?.value}>
								{serializedChildren}
							</li>
						);
					}
					case "quote": {
						const node = _node as SerializedLexicalNode as SerializedQuoteNode;

						return (
							<blockquote
								key={index}
								className="container mx-auto px-6 md:px-0 font-semibold border-l border-indigo-600"
							>
								<p>{serializedChildren}</p>
							</blockquote>
						);
					}
					case "link": {
						const node = _node as SerializedLexicalNode as SerializedLinkNode;

						const fields: LinkFields = node.fields;

						if (fields.linkType === "custom") {
							const rel = fields.newTab ? "noopener noreferrer" : undefined;

							return (
								<a
									href={fields.url}
									key={index}
									rel={rel}
									target={fields.newTab ? 'target="_blank"' : undefined}
								>
									{serializedChildren}
								</a>
							);
						} else {
							return <span key={index}>Internal link coming soon</span>;
						}
					}
					default:
						return null;
				}
			})}
		</>
	);
}
