import React from 'react';

const Seasons = ({data = []}) => {
	return (
		<section className="seasons">
			<h2 className="seasons__title">Seasons</h2>
			<ul className="seasons__seasons-list seasons-list">
				{data.map((item) => {
					const {id, name, poster, overview, episodeCount, airDate = ''} = item;
					return (
						<li className="seasons-list__item" key={id}>
							<p className="img-wrapper seasons-list__img">
								<img src={`//image.tmdb.org/t/p/w130_and_h195_bestv2${poster}`} alt="poster" />
							</p>
							<div className="seasons-list__descr">
								<h3 className="seasons-list__title">{name}</h3>
								<p className="seasons-list__info">
									{airDate.slice(0, 4)} | {episodeCount} Episodes
								</p>
								<p className="seasons-list__text">{overview}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Seasons;
