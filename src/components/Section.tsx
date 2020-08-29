import React, { FunctionComponent, ReactNode } from 'react';
import Heading from 'Components/Heading';

interface Props {
	title: string;
	body: () => ReactNode;
}

const Section: FunctionComponent<Props> = props => (
	<section>
		<Heading>{props.title}</Heading>

		{props.body()}
	</section>
);

export default Section;
