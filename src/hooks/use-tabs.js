import {useState, useEffect} from 'react';
import {findTab} from '../services';

const useTabs = (data, tabs, activeTab) => {
	const [currentList, setCurrentList] = useState([]);

	const tab = findTab(tabs, activeTab);
	useEffect(() => {
		setCurrentList(data[tab]);
	}, [activeTab, data, tab]);

	return currentList;
};

export default useTabs;
