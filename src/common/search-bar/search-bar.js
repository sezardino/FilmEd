import React from 'react';
import icon from './search.svg';

const SearchBar = (props) => {
	const {clickHandler, active, submitHandler, query, setQuery} = props;

	if (!active) {
		return (
			<img
				src={icon}
				alt="search"
				className="nav__search search"
				tabIndex="2"
				onClick={clickHandler}
			/>
		);
	}

	return (
		<form className="nav__search search search--active" onSubmit={submitHandler}>
			<input
				type="text"
				name="search"
				className="search"
				value={query}
				autoFocus
				onChange={(evt) => {
					setQuery(evt.target.value);
				}}
			/>
			<button className="search__button">Search</button>
			<img
				src={icon}
				alt="search"
				className="nav__search search"
				tabIndex="2"
				onClick={clickHandler}
			/>
		</form>
	);
};

export default SearchBar;
