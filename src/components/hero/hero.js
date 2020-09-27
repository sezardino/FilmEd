import React from 'react';

const backgroundImage = (background) => ({
	backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${background})`,
});

const Hero = (props) => {
	let {background} = props;
	background = background ? backgroundImage(background) : null;
	return (
		<section className="hero" style={background}>
			<div className="hero__wrapper">
				<div className="container">
					<h1 className="hidden">Movie service FilmEd.io is all free</h1>
					<h2 className="hero__title">
						Welcome On <span>FilmEd.io</span>
					</h2>
				</div>
			</div>
		</section>
	);
};

export default Hero;
