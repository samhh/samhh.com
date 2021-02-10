import { ReactElement, ReactNode } from 'react';
import s from './resume.module.css';
import * as O from 'fp-ts/lib/Option';
import Nav, { NavPage } from '~/components/Nav';
import Experience from '~/components/Experience';
import Footer from '~/components/Footer';
import Helmet from 'react-helmet';
import Quote from '~/components/Quote';
import Section from '~/components/Section';
import { Contribution, Hobby, Project, Work } from '~/modules/resume';

const work: NonEmptyArray<Work> = [
	{
		company: 'Adaptavist',
		website: new URL('https://www.adaptavist.com'),
		startDate: new Date('2018-12-11'),
		endDate: O.none,
		summary: 'At Adaptavist I\'ve spent considerable time refactoring the untyped codebase to strict TypeScript, improving quality, safety, and maintainability along the way. I\'m a strong voice for best practices within my team, and am a positive proponent of pure functional programming to the wider department. I\'ve also begun leading the way on testing, introducing property-based testing to our unit tests and integration testing to our React components. I regularly pair with and mentor teammates.',
		highlights: ['TypeScript', 'React', 'Node', 'Testing', 'Microservices', 'AWS Lambda'],
	},
	{
		company: 'Oddschecker',
		website: new URL('https://www.oddschecker.com'),
		startDate: new Date('2017-02-28'),
		endDate: O.some(new Date('2018-12-10')),
		summary: 'At Oddschecker I pioneered a greenfield B2B project utilising React and D3 on the frontend and Node on the backend. I was introduced to static typing via TypeScript, something I now can\'t see myself ever leaving behind. I was, as ever, perennially focused on code quality and long-term maintainability, and I matured significantly as a developer as it pertains to balancing overt business interests against tech debt. I also began to mentor more junior members of the team.',
		highlights: ['TypeScript', 'React', 'D3', 'Node', 'MongoDB'],
	},
	{
		company: 'Impero',
		website: new URL('https://weareimpero.com'),
		startDate: new Date('2015-12-07'),
		endDate: O.some(new Date('2017-02-25')),
		summary: 'My work at Impero was predominantly frontend-heavy and really challenged me to get to grips with the wonderful disaster that is CSS, as well as more importantly level up my JavaScript ability. By the end of my time here I was proficient in vanilla JavaScript and beginning to enter the world of functional reactive programming with Vue.',
		highlights: ['JavaScript', 'Vue', 'Node.js', 'Stylus', 'PostCSS'],
	},
	{
		company: 'Perspective Publishing',
		website: new URL('https://www.perspectivepublishing.com'),
		startDate: new Date('2014-03-03'),
		endDate: O.some(new Date('2015-12-04')),
		summary: 'I designed and implemented the majority of Perspective\'s websites. Additionally I began the rewrite of the internal company CMS, converging dozens of legacy systems into a single unified experience. Prior to leaving I lobbied for a change from archaic FTP uploads to a version control system.',
		highlights: ['HTML', 'CSS', 'Sass', 'PHP', 'MySQL', 'Git'],
	},
];

const projects: NonEmptyArray<Project> = [
	{
		name: 'tshm',
		website: new URL('https://github.com/samhh/tshm'),
		startDate: new Date('2020-12-10'),
		endDate: O.none,
		summary: 'tshm is a parser and formatter for TypeScript declarations that outputs HM-style type signatures. The parser is implemented as a recursive descent parser.',
		highlights: ['Haskell', 'megaparsec', 'optparse-applicative'],
	},
	{
		name: 'terpod',
		website: new URL('https://github.com/samhh/terpod'),
		startDate: new Date('2020-08-11'),
		endDate: O.none,
		summary: 'terpod is a terminal podcast manager written in Haskell. It allows the user to sync feeds, list feed episodes, and download episodes on demand.',
		highlights: ['Haskell', 'optparse-applicative'],
	},
	{
		name: 'fp-ts-std',
		website: new URL('https://github.com/samhh/fp-ts-std'),
		startDate: new Date('2020-10-19'),
		endDate: O.none,
		summary: 'fp-ts-std is a library targeting the fp-ts ecosystem, aiming to be something of a pseudo-standard library, fill in the gaps between fp-ts and Ramda, and generally flesh out what\'s missing in the parent library.',
		highlights: ['TypeScript', 'fp-ts'],
	},
	{
		name: 'Bukubrow',
		website: new URL('https://github.com/samhh/bukubrow-webext'),
		startDate: new Date('2017-02-21'),
		endDate: O.none,
		summary: 'Bukubrow is a WebExtension for Buku, a command-line bookmark manager. It includes a native binary written in Rust that interfaces with the Buku database. As of time of writing, analytics from Firefox and Chrome suggest that this WebExtension is being actively used by several hundred people. There is a work-in-progress branch in which the frontend is being rewritten in PureScript with Halogen.',
		highlights: ['Rust', 'TypeScript', 'React', 'Regex', 'SQLite'],
	},
	{
		name: 'bangin',
		website: new URL('https://github.com/samhh/bangin'),
		startDate: new Date('2020-09-16'),
		endDate: O.none,
		summary: 'bangin is a deliberately small, thoughtfully-designed shell script which replicates the behaviour of DuckDuckGo\'s bangs on the command-line.',
		highlights: ['POSIX Shell'],
	},
	{
		name: 'samhh.com',
		website: new URL('https://github.com/samhh/samhh.com'),
		startDate: new Date('2019-02-09'),
		endDate: O.none,
		summary: 'This is the site you\'re viewing right now! I\'ve strived to make it maintainable above all else; it produces static files with Gatsby and can be easily deployed to countless service providers without any hassle.',
		highlights: ['TypeScript', 'React', 'Gatsby', 'GraphQL'],
	},
];

const contrib: NonEmptyArray<Contribution> = [
	{
		name: 'Aura',
		website: new URL('https://github.com/fosskers/aura'),
		summary: 'Aura is a command-line AUR (Arch User Repository) helper. My contribution was aimed at adhering the configuration of Aura to the XDG standard.',
		changesets: [
			{
				id: '!624',
				url: new URL('https://github.com/fosskers/aura/pull/624/'),
			},
		],
		highlights: ['Haskell'],
	},
	{
		name: 'fp-ts-contrib',
		website: new URL('https://github.com/gcanti/fp-ts-contrib'),
		summary: 'fp-ts-contrib is a community-driven utility package for fp-ts, a library which enables typed functional programming in TypeScript. My contribution added the filterA module, which enables filtering an array with an applicative predicate.',
		changesets: [
			{
				id: '!56',
				url: new URL('https://github.com/gcanti/fp-ts-contrib/pull/56'),
			},
		],
		highlights: ['TypeScript'],
	},
];

const hobbies: NonEmptyArray<Hobby> = [
	{
		name: 'Mathematics',
		summary: 'Functional programming has reintroduced me to mathematics, the subject I always felt an affinity for. I\'m working my way through Khan Academy at the moment.'
	},
	{
		name: 'Linux',
		summary: 'Perhaps unsurprisingly as a software engineer I enjoy working with computers. I\'ve built my own PC on which I run Arch Linux, and even game on it for everything not in VR. I use xmonad, configured in Haskell, as my tiling window manager, and (n)vim is my preferred modal editor. I live on the command-line.'
	},
	{
		name: 'Running & Self-Improvement',
		summary: 'I\'ve found that working remotely enables me to run more frequently. I\'m still not very fast over long distances, but I\'m getting there, recently hitting the beginner\'s milestone of 5km in 30 minutes. Self-improvement in all aspects of life is very important to me; there is nothing worse than stagnation.'
	},
	{
		name: 'Gaming',
		summary: 'I\'m an avid gamer, currently predominantly spending my time with Deep Rock Galactic and Half-Life: Alyx. I hit Grand Champion in Rocket League a while back and decided that was the right time to take it out of my regular rotation, but feel free to hit me up for a game!'
	},
];

const Resume = (): ReactElement => (
	<>
		<Helmet>
			<title>Sam A. Horvath-Hunt's résumé — Software Engineer</title>
		</Helmet>

		<div className='u-page'>
			<Nav activePage={NavPage.Resume} />

			<main>
				<p className={s.intro}>
					<strong>Software Engineer</strong>&nbsp;Hi there! I'm a software engineer in London, currently working remotely, with a growing passion for pure functional programming in the likes of Haskell.
				</p>

				<Quote
					quote='Quality is pride of workmanship.'
					author='W. Edwards Deming'
				/>

				<Section title='Jobs' body={(): ReactNode => work.map(j => (
					<Experience
						key={j.company}
						title={(): ReactNode => <a href={j.website.href} target='_blank' rel='noopener noreferrer'>{j.company}</a>}
						dates={[j.startDate, j.endDate]}
						summary={j.summary}
						tags={j.highlights}
					/>
				))} />

				<Section title='Open Source Projects' body={(): ReactNode => projects.map(p => (
					<Experience
						key={p.name}
						title={(): ReactNode => <a href={p.website.href} target='_blank' rel='noopener noreferrer'>{p.name}</a>}
						dates={[new Date(p.startDate), p.endDate]}
						summary={p.summary}
						tags={p.highlights}
					/>
				))} />

				<Section title='Open Source Contributions' body={(): ReactNode => contrib.map(c => (
					<Experience
						key={c.name}
						links={c.changesets.map(ch => ({ title: ch.id, url: ch.url }))}
						title={(): ReactNode => <a href={c.website.href} target='_blank' rel='noopener noreferrer'>{c.name}</a>}
						summary={c.summary}
						tags={c.highlights}
					/>
				))} />

				<Section title='Hobbies' body={(): ReactNode => hobbies.map(h => (
					<Experience
						key={h.name}
						title={h.name}
						summary={h.summary}
					/>
				))} />
			</main>

			<Footer
				title='References'
				description='Available upon request.'
			/>
		</div>
	</>
);

export default Resume;

