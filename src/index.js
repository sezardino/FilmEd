import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {FilmsProvider} from './context';

import Api from './services';
import ErrorBoundary from './components/error-boundary/';

import App from './components/app';
import store from './store';
const api = new Api('ru-RU');

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundary>
			<Router>
				<App />
			</Router>
		</ErrorBoundary>
	</Provider>,
	document.querySelector('#root')
);
