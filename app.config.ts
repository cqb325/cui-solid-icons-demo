import { defineConfig } from "@solidjs/start/config";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkExpressiveCode, {
	ExpressiveCodeTheme,
} from "remark-expressive-code";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

// @ts-expect-error missing types
import pkg from "@vinxi/plugin-mdx";

const { default: vinxiMdx } = pkg;


export default defineConfig({
	server: {
		preset: "netlify",
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: false,
			failOnError: true,
			ignore: [/\{\getPath}/, /.*?emojiSvg\(.*/],
		},
	},
	extensions: ["mdx", "md", "tsx"],
	vite: () => ({
		plugins: [
			vinxiMdx.withImports({})({
				define: {
					"import.meta.env": "'import.meta.env'",
				},
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				rehypePlugins: [
					[
						rehypeRaw,
						{
							passThrough: nodeTypes,
						},
					],
					[rehypeSlug],
					[
						rehypeAutoLinkHeadings,
						{
							behavior: "wrap",
							properties: {
								className: "heading",
							},
						},
					],
				],
				remarkPlugins: [
					remarkFrontmatter,
					remarkGfm,
					[
						remarkExpressiveCode,
						{
							themes: ["min-light", "material-theme-ocean"],
							themeCSSSelector: (theme: ExpressiveCodeTheme) =>
								`[data-theme="${theme.name}"]`,
						},
					],
				],
			}),
			{ enforce: "pre" },
		],
	}),
});
