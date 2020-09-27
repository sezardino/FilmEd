import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import FilmsProvider from './context/';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/';

import App from './components/app';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<FilmsProvider>
			<ErrorBoundary>
				<Router>
					<App />
				</Router>
			</ErrorBoundary>
		</FilmsProvider>
	</Provider>,
	document.querySelector('#root')
);
