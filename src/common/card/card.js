import React from 'react';
import {Link} from 'react-router-dom';
import noImage from './no-image.svg';

const Card = (props) => {
	let {id, poster, title = '', name = '', rating, releaseDate, type} = props.item;
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	const link = type === 'movie' ? `/movie/${id}` : `/show/${id}`;
	poster = poster ? `//image.tmdb.org/t/p/w220_and_h330_face${poster}` : noImage;
	return (
		<li className="list__card list__list-item card" key={id}>
			<Link to={link}>
				<p className="card__img">
					<img src={poster} alt={`${title}`} />
				</p>
				<span className="card__rating">{rating}</span>
				<h3 className="card__title">{title || name}</h3>
				<p className="card__production_year">{releaseDate}</p>
			</Link>
		</li>
	);
};

export default Card;
