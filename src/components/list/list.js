import React, {useEffect, useState} from 'react';
import next from './next.png';
import prev from './prev.png';

const shownList = (data, showCount, count = 0) => {
	let [a, b] = showCount;
	a += count;
	b += count;
	const currentList = data.slice(a, b);

	return currentList;
};

const List = (props) => {
	const {data, renderFunc} = props;

	const [currentList, setCurrentList] = useState([]);
	const [showCount, setShowCount] = useState([0, 4]);
	useEffect(() => {
		setCurrentList(shownList(data, showCount));
	}, [data, showCount]);

	const arrowHolder = (n) => {
		setShowCount((prevCount) => {
			let [a, b] = prevCount;
			const showCountOnStart = [0, 4];
			const showCountOnEnd = [data.length - 4, data.length];
			a += n;
			b += n;
			if (a >= data.length) {
				return showCountOnStart;
			}
			if (b <= 0) {
				return showCountOnEnd;
			}
			return [a, b];
		});
	};

	return (
		<section className="list">
			<div className="container list__wrapper">
				<header className="list__header">
					<h2 className="list__title">What's Popular</h2>
					{props.children}
				</header>
				<div className="list__content-wrapper">
					<img
						src={next}
						alt="next"
						className="list__arrow list__arrow--next"
						onClick={() => arrowHolder(4)}
					/>
					{currentList.map(renderFunc)}
					<img
						src={prev}
						alt="prev"
						className="list__arrow list__arrow--prev"
						onClick={() => arrowHolder(-4)}
					/>
				</div>
			</div>
		</section>
	);
};

export default List;
