import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

import Hero from '../hero';
import {PopularList, TrendsList} from '../app-components';
import {useLoad} from '../../hooks';

const HomePage = (props) => {
	const {getPopular, getTrends, getBG, popular, trends, tabChange, background} = props;
	const bg = !!popular.data.onTv.length && !!trends.data.today.length;
	useLoad(getPopular);
	useLoad(getTrends);
	useLoad(getBG, bg);
	return (
		<main className="home-page">
			<Hero background={background} />
			<PopularList listData={popular} onTabClick={tabChange} />
			<TrendsList listData={trends} onTabClick={tabChange} />
		</main>
	);
};

const mapStateToProps = (state) => {
	const {data} = state;
	const {languages} = data;
	return {
		popular: data.popular,
		trends: data.trends,
		language: languages.activeLanguage,
		background: data.background,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	getPopular: () => {
		const {context} = ownProps;
		context.getPopular().then((data) => {
			return dispatch(ActionCreator.GET_DATA(data));
		});
	},

	getBG: () => {
		return dispatch(ActionCreator.GET_HERO_BG());
	},

	getTrends: () => {
		const {context} = ownProps;
		context.getTrends().then((data) => {
			return dispatch(ActionCreator.GET_DATA(data));
		});
	},
	tabChange: (data) => dispatch(ActionCreator.CHANGE_TAB(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
