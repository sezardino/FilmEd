import React from 'react';

import poster from './poster1.jpg';

const background = {
	height: '360px',
	backgroundImage: `url(${poster})`,
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
