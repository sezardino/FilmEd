import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../../reducer/';
import {TYPE} from '../../../const';

import Hero from './components/hero';
import PageTabs from './components/page-tabs';
import Cast from './components/cast';
import Seasons from './components/seasons';
import Reviews from './components/reviews';
import Recommendations from './components/recommendations';

const ShowPage = (props) => {
	const {data, getData, dataId, language, recommendations, cast, reviews} = props;
	const {seasons} = data;
	console.log(props);
	useEffect(() => {
		getData(dataId);
	}, [dataId, language]);
	return (
		<main className="show-page">
			<Hero data={data} />
			<section className="content">
				<div className="container content__wrapper">
					<PageTabs />
					<div className="content__content-wrapper">
						<Cast data={cast} />
						<Seasons data={seasons} />
						<Reviews data={reviews} />
						<Recommendations data={recommendations} />
					</div>
				</div>
			</section>
		</main>
	);
};

const mapStateToProps = ({data, show}) => ({
	data: show.data,
	cast: show.cast,
	reviews: show.reviews,
	recommendations: show.recommendations,
	language: data.languages.activeLanguage,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: (id) => {
		const {context} = ownProps;
		if (id < 100000) {
			context.getDetails(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
			context.getKeywords(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));
			context.getCast(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_CAST(data)));
			context
				.getExternalIds(id, TYPE.TV)
				.then((data) => dispatch(ActionCreator.GET_EXTERNAL_IDS(data)));
			context.getReviews(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
			context
				.getRecommendations(id, TYPE.TV)
				.then((data) => dispatch(ActionCreator.GET_RECOMMENDATIONS(data)));
		} else {
			context
				.getDetails(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
			context
				.getKeywords(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));

			context.getCast(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_CAST(data)));
			context.getReviews(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
			context
				.getRecommendations(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_RECOMMENDATIONS(data)));
			context
				.getExternalIds(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_EXTERNAL_IDS(data)));
		}
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
