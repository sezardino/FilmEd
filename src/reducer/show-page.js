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
};

const ActionCreator = {
	GET_SHOW_DATA: (data) => ({type: ActionType.GET_SHOW_DATA, payload: data}),
	GET_KEYWORDS: (data) => ({type: ActionType.GET_KEYWORDS, payload: data}),
	GET_CAST: (data) => ({type: ActionType.GET_CAST, payload: data}),
	GET_REVIEWS: (data) => ({type: ActionType.GET_REVIEWS, payload: data}),
	GET_EXTERNAL_IDS: (data) => ({type: ActionType.GET_EXTERNAL_IDS, payload: data}),
	GET_RECOMMENDATIONS: (data) => ({type: ActionType.GET_RECOMMENDATIONS, payload: data}),
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

		default:
			return state;
	}
};

export {ActionType, ActionCreator};
export default reducer;
