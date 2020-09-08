import React from 'react';

import logo from './logo.png';
import icon from './search.svg';

const Header = () => {
	return (
		<header className="header">
			<div className="container header__wrapper">
				<img src={logo} alt="filmEd logo" className="header__logo logo" />
				<nav className="header__nav nav">
					<div className="nav__language-change">EN</div>
					<img src={icon} alt="search" className="nav__search search" />
				</nav>
			</div>
		</header>
	);
};

export default Header;
