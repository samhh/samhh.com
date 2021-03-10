import { FunctionComponent } from "react"
import * as s from "./Heading.module.css"

const Heading: FunctionComponent = ({ children }) => (
  <h1 className={s.heading}>{children}</h1>
)

export default Heading
