import { ReactElement } from 'react';
import { graphql } from 'gatsby';
import s from './index.module.css';
import Nav, { NavPage } from '~/components/Nav';
import Helmet from 'react-helmet';

type Props = {
	data: {
		allMarkdownRemark: {
			nodes: {
				frontmatter: {
					slug: string;
					title: string;
					friendlyDate: string;
					date: string;
				};
			}[];
		};
	};
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
					{nodes.map(({ frontmatter: meta }) => (
						<li key={meta.slug}>
							<time dateTime={meta.date}>{meta.friendlyDate}</time><br />
							<a href={`/blog/${meta.slug}/`}>{meta.title}</a>
						</li>
					))}
				</ol>
			</main>
		</div>
	</>
);

export default Index;

export const query = graphql`
	query {
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

