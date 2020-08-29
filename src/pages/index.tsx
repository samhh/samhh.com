import React, { FunctionComponent, ReactNode } from 'react';
import resume from '../../data/resume.json';
import s from './index.module.css';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { not } from 'fp-ts/lib/function';
import { isEmpty } from 'Modules/string';
import { fromString } from 'Modules/date';
import Experience from 'Components/Experience';
import Footer from 'Components/Footer';
import Helmet from 'react-helmet';
import Quote from 'Components/Quote';
import Section from 'Components/Section';

const homepage: FunctionComponent = () => {
	const { basics, work, projects, contrib, interests } = resume;

	return (
		<>
			<Helmet>
				<title>Sam A. Horvath-Hunt — Software Engineer — Portfolio</title>
			</Helmet>

			<div className={[s.page, 'u-width-limiter'].join(' ')}>
				<header>
					<h1 className={s.name}>
						<strong>{forename}</strong>&nbsp;
						<span>{restOfName.join(' ')}</span>
					</h1>

					<ul className={s.contact}>
						<li>{basics.location.city}, {basics.location.countryCode}</li>
						<li><a href={`mailto:${basics.email}`}>Email</a></li>
						<li><a href="/publickey.txt" target="_blank">PGP</a></li>

						{basics.profiles.map(p => (
							<li key={p.network}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.network}</a></li>
						))}
					</ul>
				</header>

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

export default homepage;

