import { FunctionComponent } from "react"
import Heading from "~/components/Heading"

type Props = {
  title: string
  description: string
}

const Footer: FunctionComponent<Props> = props => (
  <footer>
    <Heading>{props.title}</Heading>
    <p>{props.description}</p>
  </footer>
)

export default Footer
