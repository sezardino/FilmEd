import {api} from '../api';

const initialState = {
	searchQuery: '',
	data: [],
};

const ActionType = {
	SEARCH_QUERY: 'SEARCH_QUERY',
	SEARCH: 'SEARCH',
};

const ActionCreator = {
	SEARCH_QUERY: (query) => ({type: ActionType.SEARCH_QUERY, payload: query}),
	SEARCH: (data) => ({type: ActionType.SEARCH, payload: data}),
};

const ThunkCreator = {
	getSearchData: (query, language) => (dispatch) => {
		api[language].getSearch(query).then((data) => dispatch(ActionCreator.SEARCH(data)));
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.SEARCH_QUERY:
			return {...state, searchQuery: action.payload};
		case ActionType.SEARCH:
			return {...state, data: {...action.payload}};
		default:
			return state;
	}
};
export {ActionType, ActionCreator, ThunkCreator};
export default reducer;
