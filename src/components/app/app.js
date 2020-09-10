import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from '../header';
import Footer from '../footer';
import {HomePage} from '../pages';

import '../../Sass/app.scss';

const App = () => {
	return (
		<React.Fragment>
			<Header />
			<main>
				<Switch>
					<Route path="/" component={HomePage} />
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default App;
