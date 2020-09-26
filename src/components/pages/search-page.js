import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ActionCreator} from '../../reducer';
import PageTabs, {Tab} from '../page-tabs';

const SearchPage = (props) => {
	const {data = [], searchQuery, getData, context, query} = props;
	const {results = [], total_pages, total_results} = data;

	const [activeTab, setActiveTab] = useState('movies');

	const tabHandler = (field) => {
		setActiveTab(field);
	};

	useEffect(() => {
		context.getSearch(searchQuery || query).then(getData);
	}, [searchQuery || query]);
	return (
		<main className="search-page">
			<section className="search">
				<div className="container search__wrapper">
					<div className="tabs__wrapper">
						<h2 className="tabs__title">Search Results</h2>
						<PageTabs>
							<Tab field="movies" label="Movies" activeTab={activeTab} onTabClick={tabHandler} />
							<Tab field="tvShows" label="TV Shows" activeTab={activeTab} onTabClick={tabHandler} />
							<Tab field="people" label="People" activeTab={activeTab} onTabClick={tabHandler} />
						</PageTabs>
					</div>
					<div className="search__content">
						<ul className="search__search-list search-list">
							{results.map((item) => {
								const {id, poster_path, name, overview, first_air_date = '', title} = item;
								const link = title ? `/movie/${id}` : `/show/${id}`;

								return (
									<li className="search-list__item" key={id}>
										<p className="search-list__img img-wrapper">
											<img
												src={
													poster_path
														? `//image.tmdb.org/t/p/w220_and_h330_face${poster_path}`
														: null
												}
												alt=""
											/>
										</p>
										<Link to={link} className="search-list__descr">
											<h3 className="search-list__title">{name || title}</h3>
											<p className="search-list__production-year">{first_air_date.slice(0, 4)}</p>
											<p className="search-list__overview">{overview}</p>
										</Link>
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

const mapStateToProps = ({search}) => {
	return {
		searchQuery: search.searchQuery,
		data: search.data,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getData: (data) => dispatch(ActionCreator.SEARCH(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
