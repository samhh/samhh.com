import React, { FunctionComponent } from 'react';
import s from './Quote.module.css';

type Props = {
	quote: string;
	author: string;
};

const Quote: FunctionComponent<Props> = props => (
	<blockquote className={s.quote}>
		<q>{props.quote}</q> — {props.author}
	</blockquote>
);

export default Quote;
