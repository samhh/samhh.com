const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type !== 'MarkdownRemark') return;

	const slug = createFilePath({ node, getNode, basePath: 'pages' });
	createNodeField({ node, name: 'slug', value: slug });
};

exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const template = require.resolve('./src/templates/blog-post.tsx');

  const res = await graphql(`
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

  for (const { node } of res.data.allMarkdownRemark.edges) {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: template,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  }
};

