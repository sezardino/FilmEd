import React from 'react';
import {FilmsConsumer} from '../context/';

const withService = (Component) => {
	const WithService = (props) => {
		return <FilmsConsumer>{(api) => <Component {...props} service={api} />}</FilmsConsumer>;
	};

	return WithService;
};

export default withService;
