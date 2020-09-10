import React from 'react';

const Card = (props) => {
	let {id, poster, title, rating, releaseDate} = props.item;
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	return (
		<div className="list__card card" key={id}>
			<img src={poster} alt="title" className="card__img" />
			<span className="card__rating">{rating}</span>
			<h3 className="card__title">{title}</h3>
			<p className="card__production_year">{releaseDate}</p>
		</div>
	);
};

export default Card;
