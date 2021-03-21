import { ReactElement } from "react"
import Page from "~/components/Page"
import Nav from "~/components/Nav"

const FourZeroFour = (): ReactElement => (
  <Page title="Are you lost?" desc="You shouldn\'t be here.">
    <div className="u-page">
      <Nav />

      <h1>404 Not Found</h1>
      <p>I can't find what you're looking for.</p>
      <p>But there's some cool stuff up there in the nav you can check out.</p>
      <p>
        If you think this resource should exist, please let me know, perhaps
        I've misconfigured something.
      </p>
    </div>
  </Page>
)

export default FourZeroFour
