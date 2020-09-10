import React from 'react';
import icon from './next.svg';

const List = (props) => {
	const {data, renderFunc} = props;
	const smallList = data.slice(0, 4);
	return (
		<section className="list">
			<div className="container list__wrapper">
				<header className="list__header">
					<h2 className="list__title">What's Popular</h2>
					{props.children}
				</header>
				<img src={icon} alt="next" className="list__arrow list__arrow--next" />
				<div className="list__content-wrapper">{smallList.map(renderFunc)}</div>
				<img src={icon} alt="prev" className="list__arrow list__arrow--prev" />
			</div>
		</section>
	);
};

export default List;
