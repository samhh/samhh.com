import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';
import s from './blog-post.module.css';
import Helmet from 'react-helmet';
import Nav, { Page } from 'Components/Nav';

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        friendlyDate: string;
        date: string;
      };
      html: string;
    };
  };
};

const BlogPost = ({ data: { markdownRemark: { frontmatter: meta, html } } }: Props): ReactElement => (
  <>
    <Helmet>
      <title>{meta.title}</title>
    </Helmet>

    <div className="u-page">
      <Nav activePage={Page.BlogPost} />

      <header className={s.header}>
        <h1>{meta.title}</h1>
        <time dateTime={meta.date}>{meta.friendlyDate}</time>
      </header>

      <main dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </>
);

export default BlogPost;

export const postQuery = graphql`
  query($slug: String!) {
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

