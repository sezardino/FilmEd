import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './common/header';
import Footer from './common/footer';

import {HomePage, PersonPage, SearchPage, ShowPage} from './pages';

import './Sass/app.scss';
import {useMovieContext, useMovieHistory} from './hooks';

const App = () => {
	const context = useMovieContext();
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
					}) => <ShowPage dataId={id} context={context} history={history} />}
				/>
				<Route
					path="/movie/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <ShowPage dataId={id} context={context} history={history} />}
				/>
				<Route
					path="/search/:query?"
					exact
					render={({
						match: {
							params: {query},
						},
					}) => <SearchPage query={query} context={context} />}
				/>
				<Route
					path="/person/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <PersonPage id={id} context={context} />}
				/>
				<Route exact render={() => <HomePage context={context} history={history} />} />
			</Switch>
			<Footer />
		</React.Fragment>
	);
};

export default App;
