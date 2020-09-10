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
		<List data={currentList} renderFunc={(item, index) => <Card item={item} key={index} />}>
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
		<List data={currentList} renderFunc={(item, index) => <Card item={item} key={index} />}>
			<Tabs onTabClick={onTabClick} tabs={tabs} activeTab={activeTab} />
		</List>
	);
};

export {PopularList, TrendsList};
