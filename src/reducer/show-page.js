import {api} from '../api';
import {TYPE} from '../const/const';

const initialState = {
	data: {},
};

const ActionType = {
	GET_SHOW_DATA: 'GET_SHOW_DATA',
	GET_KEYWORDS: 'GET_KEYWORDS',
	GET_CAST: 'GET_CAST',
	GET_REVIEWS: 'GET_REVIEWS',
	GET_EXTERNAL_IDS: 'GET_EXTERNAL_IDS',
	GET_RECOMMENDATIONS: 'GET_RECOMMENDATIONS',
	GET_TRAILERS: 'GET_TRAILERS',
};

const ActionCreator = {
	GET_SHOW_DATA: (data) => ({type: ActionType.GET_SHOW_DATA, payload: data}),
	GET_KEYWORDS: (data) => ({type: ActionType.GET_KEYWORDS, payload: data}),
	GET_CAST: (data) => ({type: ActionType.GET_CAST, payload: data}),
	GET_REVIEWS: (data) => ({type: ActionType.GET_REVIEWS, payload: data}),
	GET_EXTERNAL_IDS: (data) => ({type: ActionType.GET_EXTERNAL_IDS, payload: data}),
	GET_RECOMMENDATIONS: (data) => ({type: ActionType.GET_RECOMMENDATIONS, payload: data}),
	GET_TRAILERS: (data) => ({type: ActionType.GET_TRAILERS, payload: data}),
};

const ThunkCreator = {
	getShowData: (language, id, type) => (dispatch) => {
		const Api = api[language];
		switch (type) {
			case TYPE.MOVIE:
				Api.getDetails(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
				Api.getTrailers(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_TRAILERS(data)));
				Api.getKeywords(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));

				Api.getCast(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_CAST(data)));
				Api.getReviews(id, TYPE.MOVIE).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
				Api.getRecommendations(id, TYPE.MOVIE).then((data) =>
					dispatch(ActionCreator.GET_RECOMMENDATIONS(data))
				);
				Api.getExternalIds(id, TYPE.MOVIE).then((data) =>
					dispatch(ActionCreator.GET_EXTERNAL_IDS(data))
				);
				break;
			case TYPE.TV:
				Api.getDetails(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_SHOW_DATA(data)));
				Api.getTrailers(id, TYPE.TV).then((data) => {
					dispatch(ActionCreator.GET_TRAILERS(data));
				});
				Api.getKeywords(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_KEYWORDS(data)));
				Api.getCast(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_CAST(data)));
				Api.getExternalIds(id, TYPE.TV).then((data) =>
					dispatch(ActionCreator.GET_EXTERNAL_IDS(data))
				);
				Api.getReviews(id, TYPE.TV).then((data) => dispatch(ActionCreator.GET_REVIEWS(data)));
				Api.getRecommendations(id, TYPE.TV).then((data) =>
					dispatch(ActionCreator.GET_RECOMMENDATIONS(data))
				);
				break;
			default:
				break;
		}
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.GET_SHOW_DATA:
			return {...state, data: action.payload};

		case ActionType.GET_KEYWORDS:
			return {...state, keywords: action.payload};

		case ActionType.GET_EXTERNAL_IDS:
			return {...state, externalIds: action.payload};

		case ActionType.GET_CAST:
			return {...state, cast: action.payload};

		case ActionType.GET_REVIEWS:
			return {...state, reviews: action.payload};

		case ActionType.GET_RECOMMENDATIONS:
			return {...state, recommendations: action.payload};

		case ActionType.GET_TRAILERS:
			return {...state, trailers: action.payload};

		default:
			return state;
	}
};

export {ActionType, ActionCreator, ThunkCreator};
export default reducer;
