import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import s from './index.module.css';
import Experience from 'Components/experience/';
import Footer from 'Components/footer/';
import Quote from 'Components/quote/';
import Section from 'Components/section/';

export const query = graphql`
	query Resume {
		resume: dataJson {
			basics {
				name
				label
				email
				website
				summary
				location {
					city
					countryCode
				}
				profiles {
					network
					username
					url
				}
			}
			work {
				company
				website
				startDate
				endDate
				summary
				highlights
			}
			projects {
				name
				website
				startDate
				endDate
				summary
				highlights
			}
			interests {
				name
				summary
			}
		}
	}
`;

interface GetResumeRes {
	data: {
		resume: {
			basics: {
				name: string;
				label: string;
				email: string;
				website: string;
				summary: string;
				location: {
					city: string;
					countryCode: string;
				};
				profiles: {
					network: string;
					username: string;
					url: string;
				}[];
			};
			work: {
				company: string;
				website: string;
				startDate: string;
				endDate: string;
				summary: string;
				highlights: string[];
			}[];
			projects: {
				name: string;
				website: string;
				startDate: string;
				endDate: string;
				summary: string;
				highlights: string[];
			}[];
			interests: {
				name: string;
				summary: string;
			}[];
		};
	};
}

const homepage: FunctionComponent<GetResumeRes> = ({ data: { resume: { basics, work, projects, interests } } }) => {
	const [forename, ...restOfName] = basics.name.split(' ');

	return (
		<>
			<div className={[s.page, 'u-width-limiter'].join(' ')}>
				<header>
					<h1 className={s.name}>
						<strong>{forename}</strong>&nbsp;
						<span>{restOfName.join(' ')}</span>
					</h1>

					<ul className={s.contact}>
						<li>{basics.location.city}, {basics.location.countryCode}</li>
						<li><a href={`mailto:${basics.email}`}>Email</a></li>

						{basics.profiles.map(prof => (
							<li key={prof.network}><a href={prof.url} target="_blank">{prof.network}</a></li>
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

					<Section title="Jobs" body={() => work.map(job => (
						<Experience
							key={job.startDate}
							title={() => <a href={job.website} target="_blank">{job.company}</a>}
							dates={[new Date(job.startDate), job.endDate ? new Date(job.endDate) : undefined]}
							summary={job.summary}
							tags={job.highlights}
						/>
					))} />

					<Section title="Open Source" body={() => projects.map(project => (
						<Experience
							key={project.name + project.startDate}
							title={() => <a href={project.website} target="_blank">{project.name}</a>}
							dates={[new Date(project.startDate), project.endDate ? new Date(project.endDate) : undefined]}
							summary={project.summary}
							tags={project.highlights}
						/>
					))} />

					<Section title="Hobbies" body={() => interests.map(hobby => (
						<Experience
							key={hobby.name}
							title={hobby.name}
							summary={hobby.summary}
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
