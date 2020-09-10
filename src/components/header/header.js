import React from 'react';
import {Link} from 'react-router-dom';

import logo from './logo.png';
import icon from './search.svg';

const Header = () => {
	return (
		<header className="header">
			<div className="container header__wrapper">
				<Link to="/" tabIndex="0">
					<img src={logo} alt="filmEd logo" className="header__logo logo" />
				</Link>
				<nav className="header__nav nav">
					<div className="nav__language-change" tabIndex="1">
						EN
					</div>
					<img src={icon} alt="search" className="nav__search search" tabIndex="2" />
				</nav>
			</div>
		</header>
	);
};

export default Header;
