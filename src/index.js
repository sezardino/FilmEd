import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from './common/error-boundary/';

import App from './app';
import store from './reducer';

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
