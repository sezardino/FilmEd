import React from 'react';
import {connect} from 'react-redux';
import {useLoad} from '../../hooks';
import {TYPE} from '../../const/const';

import Show from './show';
import {ThunkCreator} from '../../reducer/show-page';

const getDataType = ({location: {pathname}}) => {
	if (pathname.includes('show')) {
		return TYPE.TV;
	} else if (pathname.includes('movie')) {
		return TYPE.MOVIE;
	}
};

const ShowPageContainer = (props) => {
	const {getShowData, dataId, language, history} = props;
	const showType = getDataType(history);

	useLoad(() => getShowData(language, dataId, showType), [language, dataId]);
	return <Show {...props} />;
};

const mapStateToProps = ({
	logic,
	show: {data, keywords, externalIds, cast, reviews, recommendations, trailers},
}) => ({
	data: {...data, keywords, externalIds},
	cast: cast,
	reviews: reviews,
	recommendations: recommendations,
	language: logic.languages.activeLanguage,
	trailers: trailers,
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
// 	getData: () => {
// 		const {
// 			dataId,
// 			context,
// 			history: {
// 				location: {pathname},
// 			},
// 		} = ownProps;
// 		let type;
// 		if (pathname.includes('show')) {
// 			type = TYPE.TV;
// 		} else if (pathname.includes('movie')) {
// 			type = TYPE.MOVIE;
// 		}
// 		getData(dataId, type, context, dispatch);
// 	},
// });

const mapDispatchToProps = {
	getShowData: ThunkCreator.getShowData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPageContainer);
