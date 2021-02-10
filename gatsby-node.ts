import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

// Until it's the default behaviour:
// https://github.com/gatsbyjs/gatsby/issues/28657
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) =>
	actions.setBabelPlugin({
		name: '@babel/plugin-transform-react-jsx',
		options: {
			runtime: 'automatic',
		},
	});

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type !== 'MarkdownRemark') return;

	const slug = createFilePath({ node, getNode, basePath: 'pages' });
	createNodeField({ node, name: 'slug', value: slug });
};

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql, reporter }) => {
	const template = require.resolve('./src/templates/blog-post.tsx');

	type Res = { allMarkdownRemark: { edges: { node: { frontmatter: { slug: string } } }[] } };
	const res = await graphql<Res>(`
		{
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							slug
						}
					}
				}
			}
		}
	`);

	if (res.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}

	for (const { node: { frontmatter: { slug } } } of res.data?.allMarkdownRemark?.edges ?? []) {
		createPage({
			path: `/blog/${slug}/`,
			component: template,
			context: { slug },
		});
	}
};

