import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';
import Nav from '~/components/Nav';

const FourZeroFour = (): ReactElement => (
	<>
		<Helmet>
			<title>Sam A. Horvath-Hunt's website — are you lost?</title>
		</Helmet>

		<div className="u-page">
			<Nav />

			<h1>404 Not Found</h1>
			<p>I can't find what you're looking for.</p>
			<p>But there's some cool stuff up there in the nav you can check out.</p>
			<p>If you think this resource should exist, please let me know, perhaps I've misconfigured something.</p>
		</div>
	</>
);

export default FourZeroFour;

