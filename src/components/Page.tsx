import { ReactElement, ReactNode } from "react"
import Helmet from "react-helmet"

type Props = {
  children: ReactNode
}

/**
 * A standardised page component providing common defaults.
 */
const Page = (p: Props): ReactElement => (
  <>
    <Helmet htmlAttributes={{ lang: "en" }}>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Helmet>

    {p.children}
  </>
)

export default Page
