import React, { FunctionComponent, ReactNode } from 'react';
import { format } from 'date-fns';
import s from './experience.module.css';

const formatMaybeDate = (date?: Date): string => date
	? format(date, 'MMMM yyyy')
	: 'Present';

interface Props {
	title: string | (() => ReactNode);
	dates?: [Date, Date?];
	summary: string;
	tags?: string[];
}

const Experience: FunctionComponent<Props> = (props) => (
	<div className={s.wrapper}>
		<h2 className={s.infoPrimary}>{typeof props.title === 'string' ? props.title : props.title()}</h2>

		{props.dates && (
			<h3 className={s.infoSecondary}>
				{formatMaybeDate(props.dates[0])} - {formatMaybeDate(props.dates[1])}
			</h3>
		)}

		<p className={s.summary}>{props.summary}</p>

		{props.tags && !!props.tags.length && (
			<ul className={s.tags}>
				{props.tags.map(tag => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
		)}
	</div>
);

export default Experience;

