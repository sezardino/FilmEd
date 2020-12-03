import React from 'react';
import List from '../../common/list';
import Tabs from '../../common/tabs';
import {useTabs} from '../../hooks';

import {Hero} from './components';

const HomePage = (props) => {
	const {popular = {}, trends = {}, tabHandler, background} = props;
	const {data: popularData, tabs: popularTabs = {}, activeTab: popularActiveTab = {}} = popular;
	const {data: trendsData = {}, tabs: trendsTabs = {}, activeTab: trendsActiveTab = {}} = trends;
	const popularList = useTabs(popularData, popularTabs, popularActiveTab);
	const trendsList = useTabs(trendsData, trendsTabs, trendsActiveTab);

	return (
		<main className="home-page">
			<Hero background={background} />
			<List title="What's Popular" data={popularList} count={5}>
				<Tabs onTabClick={tabHandler} tabs={popularTabs} activeTab={popularActiveTab} />
			</List>
			<List title="Trends" data={trendsList} count={5}>
				<Tabs onTabClick={tabHandler} tabs={trendsTabs} activeTab={trendsActiveTab} />
			</List>
		</main>
	);
};

export default HomePage;
