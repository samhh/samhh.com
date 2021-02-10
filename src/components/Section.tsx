import React, { FunctionComponent, ReactNode } from 'react';
import Heading from '~/components/Heading';
import s from './Section.module.css';

type Props = {
	title: string;
	body: () => ReactNode;
};

const Section: FunctionComponent<Props> = props => (
	<section className={s.wrapper}>
		<Heading>{props.title}</Heading>

		{props.body()}
	</section>
);

export default Section;
