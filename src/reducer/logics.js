import {LANGUAGES} from '../const';

const initialState = {
	languages: {activeLanguage: Object.keys(LANGUAGES)[0], languages: Object.keys(LANGUAGES)},
};

const ActionType = {
	CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
};

const ActionCreator = {
	CHANGE_LANGUAGE: (language) => ({type: ActionType.CHANGE_LANGUAGE, payload: language}),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.CHANGE_LANGUAGE:
			return {...state, languages: {...state.languages, activeLanguage: action.payload}};
		default:
			return state;
	}
};
export {ActionType, ActionCreator};
export default reducer;
