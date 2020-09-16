import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/';

import App from './components/app';
import store from './store';

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
