import React from 'react';
import {useTabs} from '../../../hooks';

import Card from '../../../common/card';
import List from '../../../common/list';
import Tabs from '../../../common/tabs';

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

export default PopularList;
