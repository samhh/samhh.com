import { ReactElement, ReactNode } from "react"
import Helmet from "react-helmet"

type Props = {
  title: string
  desc: string
  children: ReactNode
}

/**
 * A standardised page component providing common defaults and setting up SEO.
 */
const Page = (p: Props): ReactElement => (
  <>
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={`${p.title} | Sam A. Horvath-Hunt`}
      meta={[
        { name: "description", content: p.desc },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.desc },
        { property: "og:type", content: "website" },
      ]}
    >
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Helmet>

    {p.children}
  </>
)

export default Page
