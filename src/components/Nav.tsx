import React, { ReactElement, ReactNode } from 'react';
import s from './Nav.module.css';

export enum Page {
	Blog,
	BlogPost,
	Resume,
}

const MaybeLinked = (p: { href: string; children: ReactNode; enabled: boolean }): ReactElement => {
	const inner = <>{p.children}</>;

	return p.enabled ? <a href={p.href}>{inner}</a> : <strong>{inner}</strong>;
};

type Props = {
	activePage: Page;
};


const Nav = (p: Props): ReactElement => (
	<nav className={s.wrapper}>
		<h1 className={s.name}>
			<strong>Sam</strong>&nbsp;
			<span>A. Horvath-Hunt</span>
		</h1>

		<ul className={s.contact}>
			<li>London, UK</li>
			<li><a href="mailto:hello@samhh.com">Email</a></li>
			<li><a href="/publickey.txt" target="_blank">PGP</a></li>
			<li><a href="https://github.com/samhh" target="_blank" rel="noopener noreferrer">GitHub</a></li>
			<li><MaybeLinked href="/" enabled={p.activePage !== Page.Blog}>Blog</MaybeLinked></li>
			<li><MaybeLinked href="/resume" enabled={p.activePage !== Page.Resume}>Résumé</MaybeLinked></li>
		</ul>
	</nav>
);

export default Nav;

