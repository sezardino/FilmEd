import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import movieContext from '../../context';
import {FilmsProvider} from '../../context';
import Api from '../../services';

import Header from '../header';
import Footer from '../footer';
import {HomePage} from '../pages';

import '../../Sass/app.scss';

const App = (props) => {
	const context = useContext(movieContext);
	const api = new Api(props.language);
	return (
		<FilmsProvider value={api}>
			<Header />
			<main>
				<Switch>
					<Route path="/" exact render={() => <HomePage context={api} />} />
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
