import {ActionCreator} from '../reducer/';
import {TYPE} from '../const';

const findTab = (tabs, active) => {
	const values = Object.values(tabs);
	const keys = Object.keys(tabs);
	const index = values.findIndex((item) => item === active);
	const current = keys[index];
	return current;
};

const getData = (id, context, dispatch) => {
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
		context.getDetails(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
		context.getKeywords(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));

		context.getCast(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_CAST(data)));
		context.getReviews(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
		context
			.getRecommendations(id, TYPE.MOVIE)
			.then((data) => dispatch(ActionCreator.GET_RECOMMENDATIONS(data)));
		context
			.getExternalIds(id, TYPE.MOVIE)
			.then((data) => dispatch(ActionCreator.GET_EXTERNAL_IDS(data)));
	}
};

export {findTab, getData};
