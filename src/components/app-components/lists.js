import React from 'react';
import {useTabs} from '../../hooks';

import List from '../list';
import Tabs from '../tabs';
import Card from '../card';

const PopularList = (props) => {
	const {
		onTabClick,
		listData: {tabs, data, activeTab},
	} = props;

	const currentList = useTabs(data, tabs, activeTab);

	return (
		<List
			title="What's Popular"
			data={currentList}
			count={5}
			renderFunc={(item, index) => <Card item={item} key={index} />}>
			<Tabs onTabClick={onTabClick} tabs={tabs} activeTab={activeTab} />
		</List>
	);
};

const TrendsList = (props) => {
	const {
		onTabClick,
		listData: {tabs, data, activeTab},
	} = props;
	const currentList = useTabs(data, tabs, activeTab);
	return (
		<List
			title="Trends"
			data={currentList}
			count={5}
			renderFunc={(item, index) => <Card item={item} key={index} />}>
			<Tabs onTabClick={onTabClick} tabs={tabs} activeTab={activeTab} />
		</List>
	);
};

const RecommendationsList = (props) => {
	return (
		<List
			title="Recommendations"
			data={props.data}
			count={5}
			renderFunc={(item, index) => <Card item={item} key={index} />}
		/>
	);
};

const WorksList = (props) => {
	return (
		<List
			data={props.data}
			count={4}
			renderFunc={(item, index) => <Card item={item} key={index} />}
		/>
	);
};

export {PopularList, TrendsList, RecommendationsList, WorksList};
