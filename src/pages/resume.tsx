import { ReactElement, ReactNode } from "react"
import * as s from "./resume.module.css"
import * as O from "fp-ts/Option"
import Page from "~/components/Page"
import Nav, { NavPage } from "~/components/Nav"
import Experience from "~/components/Experience"
import Quote from "~/components/Quote"
import Section from "~/components/Section"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

type Work = {
  company: string
  website: URL
  startDate: Date
  endDate: Option<Date>
}

const overallStart = new Date("2014-03-03")

const keywords = [
  "Haskell",
  "PureScript",
  "pure functional programming",
  "Rust",
  "CLI",
  "shell",
  "Linux",
  "TypeScript",
  "React",
  "fp-ts",
  "Node.js",
  "testing",
  "microservices",
  "AWS Lambda",
  "CSS-in-JS",
  "HTML",
  "CSS (incl/ preprocessors)",
  "SQL",
  "Git",
  "CI",
  "WebExtensions",
]

const work: NonEmptyArray<Work> = [
  {
    company: "Adaptavist",
    website: new URL("https://www.adaptavist.com"),
    startDate: new Date("2018-12-11"),
    endDate: O.none,
  },
  {
    company: "Oddschecker",
    website: new URL("https://www.oddschecker.com"),
    startDate: new Date("2017-02-28"),
    endDate: O.some(new Date("2018-12-10")),
  },
  {
    company: "Impero",
    website: new URL("https://weareimpero.com"),
    startDate: new Date("2015-12-07"),
    endDate: O.some(new Date("2017-02-25")),
  },
  {
    company: "Perspective Publishing",
    website: new URL("https://www.perspectivepublishing.com"),
    startDate: new Date("2014-03-03"),
    endDate: O.some(new Date("2015-12-04")),
  },
]

const Resume = (): ReactElement => (
  <Page
    title="Résumé, Software Engineer"
    desc="This is the résumé of a software engineer."
  >
    <div className="u-page">
      <Nav activePage={NavPage.Resume} />

      <main>
        <p className={s.intro}>
          <strong>Software Engineer</strong>&nbsp;Hi there! I'm a software
          engineer based in London, working remotely, with a passion for pure
          functional programming.
        </p>

        <Quote
          quote="Quality is pride of workmanship."
          author="W. Edwards Deming"
        />

        <p>
          I've been writing code professionally for{" "}
          {formatDistanceToNow(overallStart)} now. If you'd like to see what
          open source software I work on in my free time, check out my software
          page via the link at the top.
        </p>

        <p>
          In my current position at Adaptavist, in the ScriptRunner Cloud team,
          I've been pioneering a number of frontend and serverless initiatives.
          These range from refactoring everything into strict, functional
          TypeScript, to encouraging us towards better testing practices,
          introducing property-based testing and page-level integration testing.
          A major redesign of a parser core to our business is currently
          planned, to which end I've written a greenlit prototype in Haskell in
          the style of a recursive descent parser.
        </p>

        <Section
          title="Programming"
          body={(): ReactNode => (
            <p>
              I care deeply about writing business logic and applications more
              broadly in the safest, most maintainable manner possible. I
              leverage the type system to encode logical invariants and
              eradicate certain classes of bugs. I write testable code and write
              good tests for that code, emphasising quality of tests over
              chasing potentially worse-than-useless coverage targets. Whilst it
              can be taken to an extreme, I do believe's there's truth in the
              idea of "self-documenting code". Where that isn't possible, I
              write concise, helpful documentation, planning for the long-term.
              I use tooling like Git effectively, including leaving a
              semantically meaningful, atomic commit log behind.
            </p>
          )}
        />

        <Section
          title="Web"
          body={(): ReactNode => (
            <p>
              My career thus far has been dominated by the web and particularly
              thereof the frontend. Early on in my career I specialised somewhat
              in CSS, though I've since heavily shifted towards programming
              itself so to speak. I've retained that hard-fought understanding
              of CSS. I've been writing and utilising APIs throughout, be they
              more traditional or in the form of microservices. I can
              comfortably interact with the DOM manually but would sooner reach
              for a reactive abstraction.
            </p>
          )}
        />

        <Section
          title="Open Source"
          body={(): ReactNode => (
            <p>
              I am ideologically tied to and have great faith in the open source
              community. To this end I contribute patches where I can, maintain
              a modest collection of my own software, and maintain some AUR
              packages. This is an area I intend to further grow into.
            </p>
          )}
        />

        <Section
          title="Learning & Teaching"
          body={(): ReactNode => (
            <p>
              I spend a significant proportion of my free time learning, and I
              enjoy sharing that knowledge with others; I routinely pair with
              colleagues and help them through challenges. This is a very large
              part of what drives me on a daily basis.
            </p>
          )}
        />

        <Section
          title="Workplace"
          body={(): ReactNode => (
            <>
              <p>
                I've been working permanently remotely since 2018. The
                flexibility suits me given my self-driven nature.
              </p>

              <p>
                I've built my own computer and run Arch Linux on it. This is the
                machine on which I do all my work, professional and personal,
                and everything else; there is a meaningful productivity gain for
                me here both in the power of the hardware and the
                configurability of the software.
              </p>

              <p>
                Sometimes my cat likes to join me when I'm programming. He is an
                invaluable source of inspiration and unintended keystrokes.
              </p>
            </>
          )}
        />

        <Section
          title="Keywords"
          body={(): ReactNode => (
            <>
              <p>
                I appreciate you may be in a hurry and want to quickly parse
                this page for a particular keyword, likely a technology. Here
                follows a non-exhaustive list in no particular order of a bunch
                of things I know at least a reasonable amount about:
              </p>

              <p>
                Keywords: <em>{keywords.join(", ")}</em>
              </p>
            </>
          )}
        />

        <Section
          title="Jobs"
          body={(): ReactNode => (
            <>
              {work.map(j => (
                <Experience
                  key={j.company}
                  title={(): ReactNode => (
                    <a href={j.website.href} rel="noopener noreferrer">
                      {j.company}
                    </a>
                  )}
                  dates={[j.startDate, j.endDate]}
                />
              ))}

              <p>References available upon request.</p>

              { // eslint-disable-next-line functional/no-expression-statement
              } <p><a href="#" onClick={(evt) => { window.print(); evt.preventDefault() }}>Download this résumé</a> (save as PDF).</p>
            </>
          )}
        />
      </main>
    </div>
  </Page>
)

export default Resume
