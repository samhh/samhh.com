import { ReactElement } from "react"
import { graphql } from "gatsby"
import * as s from "./blog-post.module.css"
import Page from "~/components/Page"
import Nav from "~/components/Nav"

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        friendlyDate: string
        date: string
      }
      html: string
      excerpt: string
    }
  }
}

const BlogPost = ({
  data: {
    markdownRemark: { frontmatter: meta, html, excerpt },
  },
}: Props): ReactElement => (
  <Page title={meta.title} desc={excerpt}>
    <div className="u-page">
      <Nav />

      <header className={s.header}>
        <h1>{meta.title}</h1>
        <time dateTime={meta.date}>{meta.friendlyDate}</time>
      </header>

      <main dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </Page>
)

export default BlogPost

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        friendlyDate: date(formatString: "MMMM DD, YYYY")
        date
      }
    }
  }
`
