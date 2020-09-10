import React from 'react';

const background = {
	backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces/yGNnjoIGOdQy3douq60tULY8teK.jpg`})`,
};

const Hero = () => {
	return (
		<section className="hero" style={background}>
			<div className="hero__wrapper">
				<div className="container">
					<h1 className="hidden">Movie service FilmEd.io is all free</h1>
					<h2 className="hero__title">Welcome</h2>
					<h3 className="hero__subtitle">On FilmEd.io</h3>
				</div>
			</div>
		</section>
	);
};

export default Hero;
