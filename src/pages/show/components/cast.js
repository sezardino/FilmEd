import React from 'react';
import {Link} from 'react-router-dom';
import {useFull} from '../../../hooks';

import noImage from './no-image.svg';

const Cast = ({data = []}) => {
	const {cast = [], crew = []} = data;
	const [full, changeFull] = useFull();
	return (
		<section className="cast">
			<header className="cast__header">
				<h2 className="cast__title">Series Cast</h2>
				{!full && (
					<button href="#" className="cast__see-more" onClick={changeFull}>
						Full Cast & Crew
					</button>
				)}
				{full && (
					<button href="#" className="cast__see-more" onClick={changeFull}>
						Hide
					</button>
				)}
			</header>

			<ul className="cast__cast-list cast-list">
				{cast.map((item, index) => {
					const count = full ? cast.length : 6;
					if (index <= count) {
						return castItem(item);
					} else {
						return null;
					}
				})}
			</ul>

			{full && crew.length > 0 && (
				<React.Fragment>
					<h3 className="cast__title">Crew</h3>
					<ul className="cast__cast-list cast-list">
						{crew.map((item) => {
							return castItem(item);
						})}
					</ul>
				</React.Fragment>
			)}
		</section>
	);
};

const castItem = (item) => (
	<li className="cast-list__item actor" key={item.credit_id}>
		<Link to={`/person/${item.id}`} className="actor__link">
			<p className="img-wrapper actor__img">
				{item.profile_path ? (
					<img
						src={`//image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`}
						alt="item.name"
					/>
				) : (
					<img src={noImage} alt="empty" />
				)}
			</p>
			<div className="actor__wrapper">
				<p className="actor__name">{item.name}</p>
				<p className="actor__character">{item.character}</p>
			</div>
		</Link>
	</li>
);

export default Cast;
