import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withService} from '../../hoc/';
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
		const {getPopular, getTrends, popularTab, trendsTab} = this.props;
		if (prevProps.activeTab !== popularTab) {
			getPopular();
		}
		if (prevProps.trendsTab !== trendsTab) {
			getTrends();
		}
	}
	render() {
		const {popular, trends, tabChange} = this.props;
		return (
			<React.Fragment>
				<Hero />
				<PopularList listData={popular} onTabClick={tabChange} />
				<TrendsList listData={trends} onTabClick={tabChange} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const {data} = state;
	return {
		popular: data.popular,
		trends: data.trends,
		popularTab: data.popularTab,
		trendsTab: data.trendsTab,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	getPopular: () => {
		const {service} = ownProps;
		service.getPopular().then((data) => {
			return dispatch(ActionCreator.GET_DATA(data));
		});
	},

	getTrends: () => {
		const {service} = ownProps;
		service.getTrends().then((data) => {
			return dispatch(ActionCreator.GET_DATA(data));
		});
	},
	tabChange: (data) => dispatch(ActionCreator.CHANGE_TAB(data)),
});

export default withService(connect(mapStateToProps, mapDispatchToProps)(HomePage));
