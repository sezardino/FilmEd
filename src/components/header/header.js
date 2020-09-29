import React from 'react';
import {Link} from 'react-router-dom';
import {useActive, useToggle} from '../../hooks';
import SearchBar from '../search-bar';

import logo from './logo.png';
import LanguageBar from '../language-bar';

const Header = () => {
	const [searchActive, searchChange] = useToggle();
	const [languageActive, languageChange] = useActive();

	return (
		<header className="header">
			<div className="container header__wrapper">
				<Link to="/" tabIndex="0">
					<img src={logo} alt="filmEd logo" className="header__logo logo" />
				</Link>
				<nav className={`header__nav nav ${searchActive ? 'nav--search' : ``}`}>
					<SearchBar active={searchActive} clickHandler={searchChange} />
					<LanguageBar active={languageActive} clickHandler={languageChange} />
				</nav>
			</div>
		</header>
	);
};

export default Header;
