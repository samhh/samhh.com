import { ReactElement, ReactNode } from "react"
import * as s from "./Footer.module.css"

type Props = {
  children: ReactNode
}

const Footer = (p: Props): ReactElement => (
  <footer className={s.wrapper}>{p.children}</footer>
)

export default Footer
