import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import next from './next.png';
import prev from './prev.png';
import noImage from './no-image.svg';

const Recommendations = ({data = []}) => {
	const [shownList, setShowsList] = useState([0, 3]);

	const arrowHolder = (n) => {
		setShowsList((prevCount) => {
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

	if (data.length === 0) {
		return null;
	}

	const currentList = data.slice(...shownList);
	return (
		<section className="recommendations">
			<h2 className="recommendations__title">Recommendations</h2>
			<img
				src={next}
				alt="next"
				className="recommendations__arrow recommendations__arrow--next"
				onClick={() => arrowHolder(3)}
			/>

			<ul className="recommendations__recommendations-list recommendations-list">
				{currentList.map((item, index) => {
					const {background, id, name, rating = 0} = item;
					const image = background
						? `//image.tmdb.org/t/p/w250_and_h141_face${background}`
						: noImage;
					if (index < 3) {
						return (
							<li className="recommendations-list__item" key={id}>
								<Link to={`/show/${id}`} className="img-wrapper recommendations-list__img">
									<img src={image} alt="poster" />
								</Link>
								<div className="recommendations-list__descr">
									<h3 className="recommendations-list__title">{name}</h3>
									<p className="recommendations-list__rating">{rating * 10}%</p>
								</div>
							</li>
						);
					}
				})}
			</ul>
			<img
				src={prev}
				alt="prev"
				className="recommendations__arrow recommendations__arrow--prev"
				onClick={() => arrowHolder(-3)}
			/>
		</section>
	);
};

export default Recommendations;
