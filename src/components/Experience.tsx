import { FunctionComponent, ReactNode } from "react"
import * as O from "fp-ts/Option"
import { constant } from "fp-ts/function"
import formatDate from "date-fns/fp/format"
import * as s from "./Experience.module.css"

const fmt = formatDate("MMMM yyyy")
const fmtCurr = O.fold(constant("Present"), fmt)

type Props = {
  title: string | (() => ReactNode)
  dates: [Date, Option<Date>]
}

const Experience: FunctionComponent<Props> = props => (
  <div className={s.wrapper}>
    <h2 className={s.infoPrimary}>
      {typeof props.title === "string" ? props.title : props.title()}

      <span className={s.infoSecondary}>
        {fmt(props.dates[0])} - {fmtCurr(props.dates[1])}
      </span>
    </h2>
  </div>
)

export default Experience
