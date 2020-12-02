import React from 'react';
import {connect} from 'react-redux';
import {useLoad, useActive} from '../../hooks';
import {TYPE} from '../../const/const';
import Search from './search';
import {ThunkCreator} from '../../reducer';

const SEARCH_TABS = {movies: TYPE.MOVIE, people: TYPE.PERSON, tvShows: TYPE.TV};

const SearchContainer = (props) => {
	const {data = [], searchQuery, getSearchData, query, language} = props;
	const {results = []} = data;

	useLoad(() => getSearchData(searchQuery || query, language), [searchQuery || query, language]);
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

const mapDispatchToProps = {
	getSearchData: ThunkCreator.getSearchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
