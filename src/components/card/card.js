import React from 'react';
import {Link} from 'react-router-dom';
const Card = (props) => {
	let {id, poster, title, rating, releaseDate} = props.item;
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	const link = id >= 100000 ? `movie/${id}` : `/show/${id}`;
	return (
		<Link to={link} className="list__card card" key={id}>
			<img
				src={`//image.tmdb.org/t/p/w220_and_h330_face${poster}`}
				alt="title"
				className="card__img"
			/>
			<span className="card__rating">{rating}</span>
			<h3 className="card__title">{title}</h3>
			<p className="card__production_year">{releaseDate}</p>
		</Link>
	);
};

export default Card;
