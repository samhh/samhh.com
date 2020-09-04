import React, { ReactElement } from 'react';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { graphql } from 'gatsby';
import s from './index.module.css';
import Nav, { NavPage } from 'Components/Nav';
import Helmet from 'react-helmet';
import { isString } from 'Modules/string';
import { IndexQuery } from '../../graphql-types';

type MinimumViableEntry = {
	slug: string;
	title: string;
	date: string;
	friendlyDate: string;
};

const isViable = (x: Partial<Record<keyof MinimumViableEntry, unknown>>): x is MinimumViableEntry =>
	[x.slug, x.title, x.date, x.friendlyDate].every(isString);

type Props = {
	data: IndexQuery;
};

const Index = ({ data: { allMarkdownRemark: { nodes } } }: Props): ReactElement => (
	<>
		<Helmet>
			<title>Sam A. Horvath-Hunt's blog</title>
		</Helmet>

		<div className="u-page">
			<Nav activePage={NavPage.Blog} />

			<main>
				<ol className={s.postList}>
					{nodes.map(x => pipe(
						x.frontmatter,
						O.fromNullable,
						O.filter(isViable),
						O.map(meta => (
							<li key={meta.slug}>
								<time dateTime={meta.date}>{meta.friendlyDate}</time><br />
								<a href={`/blog/${meta.slug}/`}>{meta.title}</a>
							</li>
						)),
						O.toNullable,
					))}
				</ol>
			</main>
		</div>
	</>
);

export default Index;

export const query = graphql`
	query Index {
		allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }) {
			nodes {
				frontmatter {
					slug
					title
					friendlyDate: date(formatString: "MMMM DD, YYYY")
					date
				}
			}
		}
	}
`;

