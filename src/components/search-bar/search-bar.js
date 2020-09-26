import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import icon from './search.svg';

import {ActionCreator} from '../../reducer';

const SearchBar = (props) => {
	const {clickHandler, active} = props;
	const history = useHistory();

	const [query, setQuery] = useState(props.searchQuery);

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
		<form
			className="nav__search search search--active"
			onSubmit={(evt) => {
				evt.preventDefault();
				if (query) {
					props.search(query);
					history.push(`/search/${query}`);
				}
			}}>
			<input
				type="text"
				name="search"
				className="search"
				value={query}
				autoFocus
				// onBlur={() => setActiveSearch(false)}
				onChange={(evt) => {
					setQuery(evt.target.value);
				}}
				onKeyDown={(evt) => {
					if (evt.key === 'Escape') {
						// setActiveSearch(false);
					}
				}}
			/>
			<button className="search__button">Search</button>
		</form>
	);
};

const mapStateToProps = ({search}) => ({
	searchQuery: search.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
	search: (query) => dispatch(ActionCreator.SEARCH_QUERY(query)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
