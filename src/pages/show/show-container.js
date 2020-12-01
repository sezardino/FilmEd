import React from 'react';
import {connect} from 'react-redux';
import {useLoad} from '../../hooks';
import {TYPE} from '../../const/const';
import {getData} from '../../services';

import Show from './show';

const ShowPageContainer = (props) => {
	const {getData, dataId, language} = props;

	useLoad(getData, [language, dataId]);
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

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: () => {
		const {
			dataId,
			context,
			history: {
				location: {pathname},
			},
		} = ownProps;
		let type;
		if (pathname.includes('show')) {
			type = TYPE.TV;
		} else if (pathname.includes('movie')) {
			type = TYPE.MOVIE;
		}
		getData(dataId, type, context, dispatch);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPageContainer);
