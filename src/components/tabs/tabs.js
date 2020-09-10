import React, {useState} from 'react';

const Tabs = (props) => {
	const {activeTab} = props;
	const {onTabClick} = props;
	const [active, setActiveTab] = useState(activeTab);
	const tabs = Object.values(props.tabs);

	const tabHandler = (id) => {
		setActiveTab(id);
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
