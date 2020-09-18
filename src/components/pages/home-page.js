import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

import Hero from '../hero';
import {PopularList, TrendsList} from '../app-components';

class HomePage extends PureComponent {
	componentDidMount() {
		const {getPopular, getTrends} = this.props;
		getPopular();
		getTrends();
	}

	componentDidUpdate(prevProps) {
		const {getPopular, getTrends, popularTab, trendsTab, language, getBG, background} = this.props;
		if (prevProps.activeTab !== popularTab || prevProps.language !== language) {
			getPopular();
		}
		if (prevProps.trendsTab !== trendsTab || prevProps.language !== language) {
			getTrends();
		}
		if (!background) {
			getBG();
		}
	}
	render() {
		const {popular, trends, tabChange, background} = this.props;
		return (
			<main className="home-page">
				<Hero background={background} />
				<PopularList listData={popular} onTabClick={tabChange} />
				<TrendsList listData={trends} onTabClick={tabChange} />
			</main>
		);
	}
}

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
