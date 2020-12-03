import React from 'react';
import {useList} from '../../hooks';
import Card from '../card';
import next from './next.png';
import prev from './prev.png';

const List = (props) => {
	const {data = [], title, count} = props;

	const [currentList, arrowHolder] = useList(data, count);
	return (
		<section className="list">
			<div className="container list__wrapper">
				{title && (
					<header className="list__header">
						{title && <h2 className="list__title">{title}</h2>}
						{props.children}
					</header>
				)}
				<div className="list__content-wrapper">
					<p className="list__arrow list__arrow--next">
						<img src={next} alt="next" onClick={() => arrowHolder(1)} />
					</p>
					<ul className="list__list">
						{currentList.map((item) => (
							<Card item={item} key={item.id} />
						))}
					</ul>
					<p className="list__arrow list__arrow--prev">
						<img src={prev} alt="prev" onClick={() => arrowHolder(-1)} />
					</p>
				</div>
			</div>
		</section>
	);
};

export default List;
