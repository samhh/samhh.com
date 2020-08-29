import React, { ReactElement, ReactNode } from 'react';
import resume from '../../data/resume.json';
import s from './resume.module.css';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { not } from 'fp-ts/lib/function';
import { isEmpty } from 'Modules/string';
import { fromString } from 'Modules/date';
import Nav, { NavPage } from 'Components/Nav';
import Experience from 'Components/Experience';
import Footer from 'Components/Footer';
import Helmet from 'react-helmet';
import Quote from 'Components/Quote';
import Section from 'Components/Section';

const Resume = (): ReactElement => {
	const { basics, work, projects, contrib, interests } = resume;

	return (
		<>
			<Helmet>
				<title>Sam A. Horvath-Hunt's résumé — Software Engineer</title>
			</Helmet>

			<div className="u-page">
				<Nav activePage={NavPage.Resume} />

				<main>
					<p className={s.intro}>
						<strong>{basics.label}</strong>&nbsp;

						{basics.summary}
					</p>

					<Quote
						quote="Quality is pride of workmanship."
						author="W. Edwards Deming"
					/>

					<Section title="Jobs" body={(): ReactNode => work.map(j => (
						<Experience
							key={j.startDate}
							title={(): ReactNode => <a href={j.website} target="_blank" rel="noopener noreferrer">{j.company}</a>}
							dates={[new Date(j.startDate), pipe(O.fromPredicate(not(isEmpty))(j.endDate), O.chain(fromString))]}
							summary={j.summary}
							tags={j.highlights}
						/>
					))} />

					<Section title="Open Source Projects" body={(): ReactNode => projects.map(p => (
						<Experience
							key={p.name}
							title={(): ReactNode => <a href={p.website} target="_blank" rel="noopener noreferrer">{p.name}</a>}
							dates={[new Date(p.startDate), pipe(O.fromPredicate(not(isEmpty))(p.endDate), O.chain(fromString))]}
							summary={p.summary}
							tags={p.highlights}
						/>
					))} />

					<Section title="Open Source Contributions" body={(): ReactNode => contrib.map(c => (
						<Experience
							key={c.name}
							links={c.pullRequests.map(pr => ({ title: pr.id, url: pr.url }))}
							title={(): ReactNode => <a href={c.website} target="_blank" rel="noopener noreferrer">{c.name}</a>}
							summary={c.summary}
							tags={c.highlights}
						/>
					))} />

					<Section title="Hobbies" body={(): ReactNode => interests.map(h => (
						<Experience
							key={h.name}
							title={h.name}
							summary={h.summary}
						/>
					))} />
				</main>

				<Footer
					title="References"
					description="Available upon request."
				/>
			</div>
		</>
	);
};

export default Resume;

