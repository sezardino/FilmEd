import React from 'react';
import {Link} from 'react-router-dom';
import {useActive} from '../../../hooks';
import Video from '../../../common/video/';
import trailer from './trailer.png';

const Hero = ({data, trailers = []}) => {
	let {
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
		// externalIds = [],
	} = data;
	const [active, activeChange] = useActive(false);

	const withImageStyle = {
		backgroundImage: `linear-gradient(0deg, rgba(0, 36, 63, 0.7), rgba(0, 36, 63, 0.7)),
		url(//image.tmdb.org/t/p/w1920_and_h800_multi_faces${background})`,
	};
	const noImageStyle = {background: 'rgba(0, 36, 63, 0.7)'};

	poster = poster ? `//image.tmdb.org/t/p/w300_and_h450_bestv2${poster}` : null;
	return (
		<section className="hero">
			<div className="hero__background" style={background ? withImageStyle : noImageStyle}>
				<div className="container hero__wrapper">
					<p className="img-wrapper hero__img">
						<img src={poster} alt={`${name} poster`} />
					</p>
					<div className="hero__descr descr">
						<p className="descr__user-rating">
							<span className="descr__user-rating--rating">{rating * 10}%</span>{' '}
							<span className="descr__user-rating--title">User Score</span>
						</p>
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
						<div className="descr__extra-info">
							{runTime && <p className="descr__run-time">{runTime}m</p>}
							&middot;
							<p className="descr__original-language">{language.toUpperCase()}</p>
						</div>
						<ul className="descr__creators-list creators-list">
							{creators.map((item) => {
								return (
									<li className="creators-list__item" key={item.id}>
										<Link to={`/person/${item.id}`} className="creators-list__link">
											{item.name}
										</Link>
										<span className="creators-list__link-descr">Creator</span>
									</li>
								);
							})}
						</ul>
						{/* <ul className="descr__links-list links-list">
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
					</ul> */}
						{keywords.length > 0 && (
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
						)}
					</div>
				</div>
			</div>
			<div className="container hero__wrapper--sub">
				<div className="descr__trailer" onClick={activeChange}>
					<img src={trailer} alt="trailer" />
					<p className="descr__trailer-title">Play Trailer</p>
				</div>
				<div className="descr__overview overview">
					<h3 className="overview__title">Overview</h3>
					<p className="overview__descr">{overview}</p>
				</div>
			</div>
			{active && <Video id={trailers[0].key} active={active} activeChange={activeChange} />}
		</section>
	);
};

export default Hero;
