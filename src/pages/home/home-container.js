import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useLoad} from '../../hooks';
import Home from './home';
import {ThunkCreator} from '../../reducer';

const HomeContainer = (props) => {
	const {getData, language} = props;
	useLoad(() => getData(language), language);
	return <Home {...props} />;
};

const mapStateToProps = ({logic, data}) => ({
	popular: data.popular,
	trends: data.trends,
	language: logic.languages.activeLanguage,
	background: data.background,
});

const mapDispatchToProps = {
	getData: ThunkCreator.getHPData,
	tabHandler: ActionCreator.CHANGE_TAB,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
