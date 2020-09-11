import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {Link} from 'react-router-dom';
import movieContext from '../../context';

import logo from './logo.png';
import icon from './search.svg';

const Header = (props) => {
	const {languages, changeLanguage} = props;
	const [activeSearch, setActiveSearch] = useState(false);
	const [activeLB, setActiveLB] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState(props.currentLanguage);
	const context = useContext(movieContext);

	const searchBar = (
		<form
			className="nav__search search search--active"
			onSubmit={(evt) => {
				evt.preventDefault();
				context.getSearch(evt.target.children[0].value).then((data) => props.search(data));
			}}>
			<input
				type="text"
				name="search"
				className="search"
				autoFocus
				onBlur={() => setActiveSearch(false)}
				onKeyDown={(evt) => {
					if (evt.key === 'Escape') {
						setActiveSearch(false);
					}
				}}
			/>
			<button className="search__button" onClick={(evt) => evt.preventDefault()}>
				Search
			</button>
		</form>
	);

	const languageBar = (
		<div className="nav__language language" tabIndex="1" onClick={() => setActiveLB(true)}>
			{currentLanguage}
		</div>
	);

	const activeLanguageBar = (
		<form
			className="nav__language language"
			tabIndex="1"
			onChange={(evt) => {
				evt.preventDefault();
				setCurrentLanguage(evt.target.value);
				changeLanguage(evt.target.value);
				setActiveLB(false);
			}}
			onMouseLeave={() => setActiveLB(false)}>
			{languages.map((item, index) => {
				return (
					<label className="language__label" htmlFor={item} key={`${index}-${item}`}>
						{item}
						<input type="radio" name="language" value={item} id={item} />
					</label>
				);
			})}
		</form>
	);

	const standardBar = (
		<nav className={`header__nav nav ${activeSearch && 'nav--search'}`}>
			<img
				src={icon}
				alt="search"
				className="nav__search search"
				tabIndex="2"
				onClick={() => setActiveSearch(true)}
			/>
		</nav>
	);

	return (
		<header className="header">
			<div className="container header__wrapper">
				<Link to="/" tabIndex="0">
					<img src={logo} alt="filmEd logo" className="header__logo logo" />
				</Link>
				<nav className={`header__nav nav ${activeSearch && 'nav--search'}`}>
					{activeSearch ? searchBar : standardBar}
					{activeLB ? activeLanguageBar : languageBar}
				</nav>
			</div>
		</header>
	);
};

const mapStateToProps = ({data: {languages}}) => ({
	currentLanguage: languages.activeLanguage,
	languages: languages.languages,
});

const mapDispatchToProps = (dispatch) => ({
	changeLanguage: (language) => dispatch(ActionCreator.CHANGE_LANGUAGE(language)),
	search: (data) => dispatch(ActionCreator.SEARCH(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
