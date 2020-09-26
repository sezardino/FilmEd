import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, useHistory} from 'react-router-dom';
import {FilmsProvider} from '../../context';
import Api from '../../services';

import Header from '../header';
import Footer from '../footer';
import {HomePage, PersonPage, SearchPage, ShowPage} from '../pages';

import '../../Sass/app.scss';

const App = (props) => {
	const api = new Api(props.language);
	const history = useHistory();
	return (
		<FilmsProvider value={api}>
			<Header />
			<Switch>
				<Route path="/" exact render={() => <HomePage context={api} history={history} />} />
				<Route
					path="/show/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <ShowPage dataId={id} context={api} history={history} />}
				/>
				<Route
					path="/movie/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <ShowPage dataId={id} context={api} history={history} />}
				/>
				<Route
					path="/search/:query?"
					exact
					render={({
						match: {
							params: {query},
						},
					}) => <SearchPage query={query} context={api} />}
				/>
				<Route
					path="/person/:id?"
					exact
					render={({
						match: {
							params: {id},
						},
					}) => <PersonPage id={id} context={api} />}
				/>
			</Switch>
			<Footer />
		</FilmsProvider>
	);
};

const mapStateToProps = ({data: {languages}}) => ({
	language: languages.activeLanguage,
});

export default connect(mapStateToProps)(App);
