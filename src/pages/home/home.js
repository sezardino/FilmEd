import React from 'react';

import {PopularList, TrendsList, Hero} from './components';

const HomePage = (props) => {
	const {popular, trends, tabHandler, background} = props;
	return (
		<main className="home-page">
			<Hero background={background} />
			<PopularList listData={popular} tabHandler={tabHandler} />
			<TrendsList listData={trends} tabHandler={tabHandler} />
		</main>
	);
};

export default HomePage;
