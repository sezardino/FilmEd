import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useLoad} from '../../hooks';
import Home from './home';

const HomeContainer = (props) => {
	const {getPopular, getTrends, getBG, popular, trends, language} = props;
	const bg = !!popular.data.onTv.length && !!trends.data.today.length;
	useLoad(getPopular, language);
	useLoad(getTrends, language);
	useLoad(getBG, bg);
	return <Home {...props} />;
};

const mapStateToProps = ({logic, data}) => ({
	popular: data.popular,
	trends: data.trends,
	language: logic.languages.activeLanguage,
	background: data.background,
});

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
	tabHandler: (data) => dispatch(ActionCreator.CHANGE_TAB(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
