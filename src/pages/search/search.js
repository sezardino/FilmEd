import React from 'react';
import {Link} from 'react-router-dom';
import {linkTo} from '../../services/utils';
import {Tab, PageTabs} from '../../common/page-tabs';

const SearchPage = (props) => {
	const {data = [], resultList, tabHandler, activeTab} = props;
	const {total_pages, total_results} = data;
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
							{resultList.map((item) => {
								const {id, poster, name, overview, type, knownFor = {}} = item;
								const {department, data = []} = knownFor;

								return (
									<li className="search-list__item" key={`${type}${id}`}>
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
																<Link to={linkTo(type, id)} key={`${type}${id}`}>
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

export default SearchPage;
