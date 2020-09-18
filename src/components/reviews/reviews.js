import React, {useState} from 'react';

const Reviews = ({data = []}) => {
	const [full, setFull] = useState(false);
	const count = !full ? 1 : data.length;

	if (data.length === 0) {
		return (
			<section className="reviews">
				<h2 className="reviews__title">
					Reviews <span className="reviews__count">{data.length}</span>
				</h2>
				<p>The are now reviews</p>
			</section>
		);
	}

	return (
		<section className="reviews">
			<h2 className="reviews__title">
				Reviews <span className="reviews__count">{data.length}</span>
			</h2>
			<ul className="reviews__list">
				{data.map((item, index) => {
					if (index < count) {
						return <Review data={item} key={item.id} />;
					}
				})}
			</ul>
			{!full && (
				<button className="reviews__se-more" onClick={() => setFull(true)}>
					See all reviews
				</button>
			)}
			{full && (
				<button className="reviews__se-more" onClick={() => setFull(false)}>
					Hide
				</button>
			)}
		</section>
	);
};

const Review = ({data}) => {
	const {author, content = '', id} = data;
	const [full, setFull] = useState(false);
	const count = !full ? (content.length < 800 ? content.length : 800) : content.length;
	return (
		<li className="reviews__list-item" key={id}>
			<div className="reviews__descr review">
				<h3 className="review__title">A review by {author}</h3>
				<p className="review__author">Written by {author}</p>
				<div className="review__text">
					{content.slice(0, count)}
					{!full && (
						<button className="review__text-see-more" onClick={() => setFull(true)}>
							...read the rest
						</button>
					)}
				</div>
			</div>
		</li>
	);
};

export default Reviews;
