import React from 'react';
import facebook from './facebook.png';
import instagram from './instagram.png';
import twitter from './twitter.png';

const Hero = ({data}) => {
	const {
		background,
		poster,
		name,
		firstAir = '',
		genres = [],
		language = '',
		runTime,
		rating = '',
		overview,
		creators = [],
		keywords = [],
		externalIds = [],
	} = data;
	return (
		<section
			className="hero"
			style={{
				backgroundImage: `linear-gradient(rgba(60, 91, 116, 0.7), rgba(60, 91, 116, 0.7)),url(//image.tmdb.org/t/p/w1920_and_h800_multi_faces${background})`,
			}}>
			<div className="container hero__wrapper">
				<p className="img-wrapper hero__img">
					<img src={`//image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`} alt={`${name} poster`} />
				</p>
				<div className="hero__descr descr">
					<h2 className="descr__title">
						{name}{' '}
						<span className="descr__title--production-year">{`(${firstAir.slice(0, 4)})`}</span>
					</h2>
					<ul className="descr__genre-list genre-list">
						{genres.map((item) => {
							return (
								<li className="genre-list__item" key={item.id}>
									<a href="#" className="genre-list__link">
										{item.name}
									</a>
								</li>
							);
						})}
					</ul>
					<p className="descr__original-language">Original Language: {language.toUpperCase()}</p>
					<p className="descr__run-time">Run time: {runTime}m</p>
					<p className="descr__user-rating">
						<span className="descr__user-rating--rating">{rating * 10}%</span>User Score{' '}
					</p>
					<div className="descr__overview overview">
						<h3 className="overview__title">Overview</h3>
						<p className="overview__descr">{overview}</p>
					</div>
					<ul className="descr__creators-list creators-list">
						{creators.map((item) => {
							return (
								<li className="creators-list__item" key={item.id}>
									<a href="#" className="creators-list__link">
										{item.name}
									</a>
									<span className="creators-list__link-descr">Creator</span>
								</li>
							);
						})}
					</ul>
					<ul className="descr__links-list links-list">
						{externalIds.map((item, index) => {
							const image = () => {
								switch (item.source) {
									case 'facebook':
										return facebook;
									case 'instagram':
										return instagram;
									case 'twitter':
										return twitter;
									default:
										break;
								}
							};
							return (
								<li className="links-list__item" key={item.source + index}>
									<a href={item.link} className="links-list__link">
										<img src={image()} alt="" />
									</a>
								</li>
							);
						})}
					</ul>
					<div className="descr__keywords keywords">
						<h3 className="keywords__title">Keywords</h3>
						<ul className="keywords__list">
							{keywords.map((item) => {
								return (
									<li className="keywords__list-item" key={item.id}>
										<a href="#" className="keywords__list-link">
											{item.name}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
