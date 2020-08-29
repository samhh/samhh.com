import React, { FunctionComponent } from 'react';
import Heading from 'Components/Heading';

interface Props {
	title: string;
	description: string;
}

const Footer: FunctionComponent<Props> = props => (
	<footer>
		<Heading>{props.title}</Heading>
		<p>{props.description}</p>
	</footer>
);

export default Footer;
