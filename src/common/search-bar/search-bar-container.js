import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useInput, useMovieHistory} from '../../hooks';
import icon from './search.svg';
import SearchBar from './search-bar';

const SearchBarContainer = (props) => {
	const {clickHandler, active, searchQuery, search} = props;
	const history = useMovieHistory();
	const [query, setQuery] = useInput(searchQuery);

	const submitHandler = (evt) => {
		evt.preventDefault();
		if (query) {
			search(query);
			history.push(`/search/${query}`);
		}
	};

	return <SearchBar {...props} submitHandler={submitHandler} query={query} setQuery={setQuery} />;
};

const mapStateToProps = ({search}) => ({
	searchQuery: search.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
	search: (query) => dispatch(ActionCreator.SEARCH_QUERY(query)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
