import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {FilmsProvider} from '../../context';
import Api from '../../services';

import Header from '../header';
import Footer from '../footer';
import {HomePage, ShowPage} from '../pages';

import '../../Sass/app.scss';

const App = (props) => {
	const api = new Api(props.language);
	return (
		<FilmsProvider value={api}>
			<Header />
			<main>
				<Switch>
					<Route
						path="/"
						exact
						render={(history) => <HomePage context={api} history={history} />}
					/>
					<Route
						path="/show/:id?"
						exact
						render={({
							match: {
								params: {id},
							},
						}) => <ShowPage dataId={id} context={api} />}
					/>
				</Switch>
			</main>
			<Footer />
		</FilmsProvider>
	);
};

const mapStateToProps = ({data: {languages}}) => ({
	language: languages.activeLanguage,
});

export default connect(mapStateToProps)(App);
