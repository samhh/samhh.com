const tsconfig = require('./tsconfig.json');

const tsconfigAliases = Object.entries(tsconfig.compilerOptions.paths).reduce((acc, [k, [v]]) => {
	const key = k.replace(/\/\*$/, '');
	const value = v.replace(/^\./, 'src').replace(/\/\*$/, '');

	acc[key] = value;

	return acc;
}, {});

module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.samhh.com',
		title: 'Sam A. Horvath-Hunt\'s blog',
		description: 'Sam A. Horvath-Hunt\'s personal blog. Mostly about code and tech.',
	},
	plugins: [
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
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark: { edges } } }) => edges.map(edge => ({
							...edge.node.frontmatter,
							description: edge.node.excerpt,
							date: edge.node.frontmatter.date,
							url: site.siteMetadata.siteUrl + '/blog/' + edge.node.frontmatter.slug,
							guid: edge.node.frontmatter.slug,
							custom_elements: [{ 'content:encoded': edge.node.html }],
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
					},
				],
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
				plugins: ['gatsby-remark-prismjs'],
			},
		},
	],
};

