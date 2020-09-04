import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';
import s from './blog-post.module.css';
import Helmet from 'react-helmet';
import Nav from 'Components/Nav';
import { BlogPostQuery } from '../../graphql-types';
import { isString } from 'Modules/string';

type MinimumViableMeta = {
	title: string;
	date: string;
	friendlyDate: string;
};

const isViableMeta = (x: Partial<Record<keyof MinimumViableMeta, unknown>>): x is MinimumViableMeta =>
	[x.title, x.date, x.friendlyDate].every(isString);

type MinimumViable = {
	html: string;
	frontmatter: MinimumViableMeta;
};

const isViable = (x: BlogPostQuery['markdownRemark']): x is MinimumViable =>
	!!x && isString(x.html) && !!x.frontmatter && isViableMeta(x.frontmatter);

type Props = {
	data: BlogPostQuery;
};

const BlogPost = ({ data: { markdownRemark } }: Props): ReactElement | null => {
	if (!isViable(markdownRemark)) return null;
	const { html, frontmatter: meta } = markdownRemark;

	return (
		<>
			<Helmet>
				<title>{meta.title}</title>
			</Helmet>

			<div className="u-page">
				<Nav />

				<header className={s.header}>
					<h1>{meta.title}</h1>
					<time dateTime={meta.date}>{meta.friendlyDate}</time>
				</header>

				<main dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</>
	);
};

export default BlogPost;

export const postQuery = graphql`
	query BlogPost($slug: String!) {
		markdownRemark(frontmatter: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				friendlyDate: date(formatString: "MMMM DD, YYYY")
				date
			}
		}
	}
`;

