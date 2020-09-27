import React from 'react';
import {useFull} from '../../hooks';

const Reviews = ({data = []}) => {
	const {full, changeFull} = useFull();
	const count = !full ? 3 : data.length;

	if (data.length === 0) {
		return (
			<section className="reviews">
				<p>The are no reviews</p>
			</section>
		);
	}

	const seeAll = !full && (
		<button className="reviews__se-more" onClick={changeFull}>
			See all reviews
		</button>
	);

	const hide = full && (
		<button className="reviews__se-more" onClick={changeFull}>
			Hide
		</button>
	);

	return (
		<section className="reviews">
			<ul className="reviews__list">
				{data.map((item, index) => {
					if (index < count) {
						return <Review data={item} key={item.id} />;
					} else {
						return null;
					}
				})}
			</ul>
			{data.length < count && seeAll && hide}
		</section>
	);
};

const Review = ({data}) => {
	const {author, content = '', id} = data;
	const {full, changeFull} = useFull();
	const count = !full ? (content.length < 400 ? content.length : 400) : content.length;
	return (
		<li className="reviews__list-item" key={id}>
			<div className="reviews__descr review">
				<div className="review__wrapper">
					<p className="review__title">Written by </p>
					<p className="review__author">{author}</p>
				</div>
				<div className="review__text">
					{content.slice(0, count)}
					{!full && (
						<button className="review__text-see-more" onClick={changeFull}>
							...read the rest
						</button>
					)}
				</div>
			</div>
		</li>
	);
};

export default Reviews;
