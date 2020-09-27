import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {TYPE} from '../../const';
import {useLoad} from '../../hooks';
import useActive from '../../hooks/use-active';
import {ActionCreator} from '../../reducer';
import {linkTo} from '../../services/utils';
import PageTabs, {Tab} from '../page-tabs';

const SEARCH_TABS = {movies: TYPE.MOVIE, people: TYPE.PERSON, tvShows: TYPE.TV};

const SearchPage = (props) => {
	const {data = [], searchQuery, getData, query, language} = props;
	const {results = [], total_pages, total_results} = data;
	const {active, activeChange} = useActive('movies');

	const activeList = results.filter((item) => item.type === SEARCH_TABS[active]);
	console.log(activeList);
	useLoad(() => getData(searchQuery || query), [searchQuery || query, language]);
	return (
		<main className="search-page">
			<section className="search">
				<div className="container search__wrapper">
					<div className="tabs__wrapper">
						<h2 className="tabs__title">Search Results</h2>
						<PageTabs>
							<Tab field="movies" label="Movies" activeTab={active} onTabClick={activeChange} />
							<Tab field="tvShows" label="TV Shows" activeTab={active} onTabClick={activeChange} />
							<Tab field="people" label="People" activeTab={active} onTabClick={activeChange} />
						</PageTabs>
					</div>
					<div className="search__content">
						<ul className="search__search-list search-list">
							{activeList.map((item) => {
								const {id, poster, name, overview, type, knownFor = {}} = item;
								const {department, data = []} = knownFor;

								return (
									<li className="search-list__item" key={id}>
										<p className="search-list__img img-wrapper">
											<img
												src={poster ? `//image.tmdb.org/t/p/w220_and_h330_face${poster}` : null}
												alt=""
											/>
										</p>
										<div className="search-list__descr">
											<Link to={linkTo(type, id)}>
												<h3 className="search-list__title">{name}</h3>
											</Link>
											{knownFor && (
												<p className="search-list__overview">
													<span>{department}</span>
													{data.length > 0 && (
														<span>
															Known for:{' '}
															{data.map(({name, title, id, type}) => (
																<Link to={linkTo(type, id)} key={id}>
																	{name || title}{' '}
																</Link>
															))}
														</span>
													)}
												</p>
											)}
											<p className="search-list__overview">{overview}</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</section>
		</main>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
