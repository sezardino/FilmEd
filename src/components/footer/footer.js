import React from 'react';

import logo from './logo.png';

const Footer = () => {
	return (
		<footer className="footer">
			<img src={logo} alt="" className="footer__logo" />
			<p className="footer__copy">
				Created By{' '}
				<a href="https://github.com/sezardino" className="footer__link">
					Edward Arechwa
				</a>
			</p>
		</footer>
	);
};

export default Footer;
