import { ReactElement } from "react"
import Page from "~/components/Page"
import Nav, { NavPage } from "~/components/Nav"
import * as s from "./software.module.css"

type Software = {
  name: string
  summary: string
  href: string
}

const allSoftware: NonEmptyArray<Software> = [
  {
    name: "tshm",
    summary:
      "tshm is a parser and formatter for TypeScript declarations that outputs HM-style type signatures. The parser is written in Haskell in the style of a recursive descent parser.",
    href: "https://github.com/samhh/tshm",
  },
  {
    name: "fp-ts-std",
    summary:
      "fp-ts-std is a library targeting the fp-ts ecosystem, aiming to be something of a pseudo-standard library, fill in the gaps between fp-ts and Ramda, and generally flesh out what's missing in the parent library.",
    href: "https://github.com/samhh/fp-ts-std",
  },
  {
    name: "terpod",
    summary:
      "terpod is a terminal podcast manager written in Haskell. It allows the user to sync feeds, list feed episodes, and download episodes on demand.",
    href: "https://github.com/samhh/terpod",
  },
  {
    name: "Bukubrow",
    summary:
      "Bukubrow is a WebExtension for Buku, a command-line bookmark manager. It includes a native binary written in Rust that interfaces with the Buku database.",
    href: "https://github.com/samhh/bukubrow-webext",
  },
  {
    name: "bangin",
    summary:
      "bangin is a deliberately small, thoughtfully-designed POSIX-compliant shell script which replicates the behaviour of DuckDuckGo's bangs on the command-line.",
    href: "https://sr.ht/~samhh/bangin/",
  },
]

const Item = (p: Software): ReactElement => (
  <div className={s.item}>
    <h2 className={s.title}>
      <a href={p.href} rel="noopener noreferrer">
        {p.name}
      </a>
    </h2>
    <p className={s.desc}>{p.summary}</p>
  </div>
)

const Software = (): ReactElement => (
  <Page title="Software" desc="A curated list of software I maintain.">
    <div className="u-page">
      <Nav activePage={NavPage.Software} />

      <main>
        <p>
          All of my open source software is currently hosted either on&nbsp;
          <a href="https://sr.ht/~samhh/" rel="noopener noreferrer">
            sourcehut
          </a>
          &nbsp;or&nbsp;
          <a href="https://github.com/samhh" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>

        <ul className={s.list}>
          {allSoftware.map(sw => (
            <Item key={sw.name} {...sw} />
          ))}
        </ul>

        <p>
          I also maintain some&nbsp;
          <a
            href="https://aur.archlinux.org/packages/?O=0&SeB=m&K=samhh&outdated=&SB=n&SO=a&PP=50&do_Search=Go"
            rel="noopener referrer"
          >
            AUR packages
          </a>
          .
        </p>
      </main>
    </div>
  </Page>
)

export default Software
