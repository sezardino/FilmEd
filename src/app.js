import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './common/header';
import Footer from './common/footer';

import {HomePage, PersonPage, SearchPage, ShowPage} from './pages';

import './Sass/app.scss';
import {useMovieHistory} from './hooks';

const App = () => {
	const history = useMovieHistory();
	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route
					path="/show/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <ShowPage dataId={id} history={history} />}
				/>
				<Route
					path="/movie/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <ShowPage dataId={id} history={history} />}
				/>
				<Route
					path="/search/:query?"
					exact
					render={({
						match: {
							params: {query},
						},
					}) => <SearchPage query={query} />}
				/>
				<Route
					path="/person/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <PersonPage id={id} />}
				/>
				<Route exact render={() => <HomePage history={history} />} />
			</Switch>
			<Footer />
		</React.Fragment>
	);
};

export default App;
