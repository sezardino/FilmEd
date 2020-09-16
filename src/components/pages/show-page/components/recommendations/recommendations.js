import React from 'react';
import {Link} from 'react-router-dom';

import noImage from './no-image.svg';

const Recommendations = ({data = []}) => {
	return (
		<section className="recommendations">
			<h2 className="recommendations__title">Recommendations</h2>
			<ul className="recommendations__recommendations-list recommendations-list">
				{data.map((item, index) => {
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
		</section>
	);
};

export default Recommendations;
