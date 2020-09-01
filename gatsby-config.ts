// eslint-disable-next-line
const tsconfig: typeof import('./tsconfig.json') = require('./tsconfig.json');

const tsconfigAliases = Object.entries(tsconfig.compilerOptions.paths)
	.reduce<Record<string, string>>((acc, [k, [v]]) => {
		const key = k.replace(/\/\*$/, '');
		const value = v.replace(/^\./, 'src').replace(/\/\*$/, '');

		acc[key] = value;

		return acc;
	}, {});

export const siteMetadata = {
	siteUrl: 'https://www.samhh.com',
	title: 'Sam A. Horvath-Hunt\'s blog',
	description: 'Sam A. Horvath-Hunt\'s personal blog. Mostly about code and tech.',
};

type SerializeData = {
	query: {
		site: {
			siteMetadata: {
				siteUrl: string;
			};
		};
		allMarkdownRemark: {
			edges: {
				node: {
					excerpt: string;
					html: string;
					frontmatter: {
						slug: string;
						title: string;
						date: string;
					};
				};
			}[];
		};
	};
};

type FeedPostMeta = {
	title: string;
	description: string;
	date: string;
	url: string;
	guid: string;
	custom_elements: Record<string, unknown>[];
};

export const plugins = [
	{
		resolve: 'gatsby-plugin-feed',
		options: {
			query: `
				{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
			`,
			feeds: [{
				serialize: ({ query: { site, allMarkdownRemark: { edges } } }: SerializeData): FeedPostMeta[] => edges.map(({ node }) => ({
					title: node.frontmatter.title,
					description: node.excerpt,
					date: node.frontmatter.date,
					url: site.siteMetadata.siteUrl + '/blog/' + node.frontmatter.slug,
					guid: node.frontmatter.slug,
					custom_elements: [{ 'content:encoded': node.html }],
				})),
				query: `
					{
						allMarkdownRemark(
							sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] },
						) {
							edges {
								node {
									excerpt
									html
									frontmatter {
										slug
										title
										date
									}
								}
							}
						}
					}
				`,
				output: '/rss.xml',
				title: 'Sam A. Horvath-Hunt\'s blog',
			}],
		},
	},
	'gatsby-plugin-react-helmet',
	{
		resolve: 'gatsby-plugin-favicon',
		options: {
			logo: './static/favicon.png',
		},
	},
	'gatsby-plugin-typescript',
	{
		resolve: 'gatsby-plugin-alias-imports',
		options: {
			alias: tsconfigAliases,
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			path: `${__dirname}/data/writings/published/`,
			name: 'markdown-pages',
		},
	},
	{
		resolve: 'gatsby-transformer-remark',
		options: {
			plugins: ['gatsby-remark-prismjs', 'gatsby-remark-smartypants'],
		},
	},
	'gatsby-plugin-no-javascript',
];

