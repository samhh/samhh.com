import React, { ReactElement } from 'react';
import resume from '../../data/resume.json';
import s from '../pages/index.module.css';

export enum Page {
	Resume,
}

type Props = {
	activePage: Page;
};

const { basics } = resume;
const [forename, ...restOfName] = basics.name.split(' ');

const Nav = (_: Props): ReactElement => (
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
);

export default Nav;

