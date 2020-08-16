import React, { FunctionComponent, ReactNode } from 'react';
import * as O from 'fp-ts/lib/Option';
import { constant } from 'fp-ts/lib/function';
import formatDate from 'date-fns/fp/format';
import s from './experience.module.css';

const fmt = formatDate('MMMM yyyy');
const fmtCurr = O.fold(constant('Present'), fmt);

interface Props {
	title: string | (() => ReactNode);
	dates?: [Date, Option<Date>];
	summary: string;
	links?: {
		title: string;
		url: string;
	}[];
	tags?: string[];
}

const Experience: FunctionComponent<Props> = (props) => (
	<div className={s.wrapper}>
		<h2 className={s.infoPrimary}>{typeof props.title === 'string' ? props.title : props.title()}</h2>

		{props.dates && (
			<h3 className={s.infoSecondary}>
				{fmt(props.dates[0])} - {fmtCurr(props.dates[1])}
			</h3>
		)}

		<p className={s.summary}>{props.summary}</p>

		{props.links && (
			<ul className={s.links}>
				{props.links.map(link => (
					<li key={link.title}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></li>
				))}
			</ul>
		)}

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

