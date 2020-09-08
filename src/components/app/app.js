import React from 'react';
import Header from '../header';
import Hero from '../hero';
import Footer from '../footer';

import '../../Sass/app.scss';

const App = () => {
	return (
		<React.Fragment>
			<Header />
			<main>
				<Hero />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default App;
