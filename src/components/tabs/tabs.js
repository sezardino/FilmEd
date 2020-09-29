import React from 'react';
import {useActive} from '../../hooks';

const Tabs = (props) => {
	const {activeTab, onTabClick} = props;
	const [active, activeChange] = useActive(activeTab);
	const tabs = Object.values(props.tabs);

	const tabHandler = (id) => {
		activeChange(id);
		onTabClick(id);
	};
	return (
		<ul className="list__tabs">
			{tabs.map((item, index) => {
				return (
					<li
						key={index}
						className={`list__tab ${active === item && 'list__tab--active'}`}
						onClick={(evt) => {
							evt.preventDefault();
							tabHandler(item);
						}}>
						{item}
					</li>
				);
			})}
		</ul>
	);
};

export default Tabs;
