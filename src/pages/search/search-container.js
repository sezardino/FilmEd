import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useLoad, useActive} from '../../hooks';
import {TYPE} from '../../const/const';
import Search from './search';

const SEARCH_TABS = {movies: TYPE.MOVIE, people: TYPE.PERSON, tvShows: TYPE.TV};

const SearchContainer = (props) => {
	const {data = [], searchQuery, getData, query, language} = props;
	const {results = []} = data;
	useLoad(() => getData(searchQuery || query), [searchQuery || query, language]);
	const [active, activeChange] = useActive('movies');
	const resultList = results.filter((item) => item.type === SEARCH_TABS[active]);

	return <Search {...props} activeTab={active} resultList={resultList} tabHandler={activeChange} />;
};

const mapStateToProps = ({search, logic}) => {
	return {
		language: logic.languages.activeLanguage,
		searchQuery: search.searchQuery,
		data: search.data,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: (query) => {
		const {context} = ownProps;
		context.getSearch(query).then((data) => dispatch(ActionCreator.SEARCH(data)));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
