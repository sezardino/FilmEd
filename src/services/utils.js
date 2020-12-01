import {ActionCreator} from '../reducer/';
import {TYPE} from '../const/const';

const findTab = (tabs, active) => {
	const values = Object.values(tabs);
	const keys = Object.keys(tabs);
	const index = values.findIndex((item) => item === active);
	const current = keys[index];
	return current;
};

const getData = (id, type, context, dispatch) => {
	switch (type) {
		case TYPE.MOVIE:
			context
				.getDetails(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
			context
				.getTrailers(id, TYPE.MOVIE)
				.then((data) => dispatch(ActionCreator.GET_TRAILERS(data)));
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
			break;
		case TYPE.TV:
			context.getDetails(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
			context.getTrailers(id, TYPE.TV).then((data) => {
				console.log(data);
				dispatch(ActionCreator.GET_TRAILERS(data));
			});
			context.getKeywords(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));
			context.getCast(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_CAST(data)));
			context
				.getExternalIds(id, TYPE.TV)
				.then((data) => dispatch(ActionCreator.GET_EXTERNAL_IDS(data)));
			context.getReviews(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
			context
				.getRecommendations(id, TYPE.TV)
				.then((data) => dispatch(ActionCreator.GET_RECOMMENDATIONS(data)));
			break;
		default:
			break;
	}
};

const linkTo = (type, id) => {
	return type === TYPE.MOVIE
		? `/movie/${id}`
		: type === TYPE.TV
		? `/show/${id}`
		: type === TYPE.PERSON
		? `/person/${id}`
		: null;
};

const sortByPopularity = (a, b) => {
	if (a.vote < b.vote) {
		return 1;
	}
	if (a.vote > b.vote) {
		return -1;
	}
	return 0;
};

const sortByDate = (a, b) => {
	const dateA = new Date(a.release);
	const dateB = new Date(b.release);
	if (+dateA < +dateB) {
		return 1;
	}
	if (+dateA > +dateB) {
		return -1;
	}
	return 0;
};

const shownList = (data, showCount, count = 0) => {
	let [a, b] = showCount;
	a += count;
	b += count;
	const currentList = data.slice(a, b);

	return currentList;
};

export {findTab, getData, sortByPopularity, shownList, sortByDate, linkTo};
