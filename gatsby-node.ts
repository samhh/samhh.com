import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { CreatePagesQuery } from './graphql-types';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type !== 'MarkdownRemark') return;

	const slug = createFilePath({ node, getNode, basePath: 'pages' });
	createNodeField({ node, name: 'slug', value: slug });
};

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql, reporter }) => {
	const template = require.resolve('./src/templates/blog-post.tsx');

	const res = await graphql<CreatePagesQuery>(`
		query CreatePages {
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

	for (const { node: { frontmatter: meta } } of res.data?.allMarkdownRemark?.edges ?? []) {
		if (!meta?.slug) continue;

		createPage({
			path: `/blog/${meta.slug}/`,
			component: template,
			context: { slug: meta.slug },
		});
	}
};

