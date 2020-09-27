import React from 'react';

const PageTabs = (props) => {
	return <ul className="content__tabs tabs">{props.children}</ul>;
};

const Tab = ({field, label, activeTab, onTabClick}) => {
	return (
		<li
			className={`tabs__item ${field === activeTab && `tabs__item-active`}`}
			onClick={() => {
				onTabClick(field);
			}}>
			{label}
		</li>
	);
};

export {Tab};
export default PageTabs;
