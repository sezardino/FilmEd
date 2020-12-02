import {api} from '../api';
const initialState = {
	data: {},
	credits: [],
};

const ActionType = {
	GET_PERSON: 'GET_PERSON',
	GET_PERSON_CREDITS: 'GET_PERSON_CREDITS',
};

const ActionCreator = {
	GET_PERSON: (data) => ({type: ActionType.GET_PERSON, payload: data}),
	GET_PERSON_CREDITS: (data) => ({type: ActionType.GET_PERSON_CREDITS, payload: data}),
};

const ThunkCreator = {
	getPersonData: (id, language) => (dispatch) => {
		api[language].getPerson(id).then((data) => dispatch(ActionCreator.GET_PERSON(data)));
		api[language]
			.getPersonCredits(id)
			.then((data) => dispatch(ActionCreator.GET_PERSON_CREDITS(data)));
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.GET_PERSON:
			return {...state, data: action.payload};
		case ActionType.GET_PERSON_CREDITS:
			return {...state, credits: action.payload};

		default:
			return state;
	}
};

export {ActionType, ActionCreator, ThunkCreator};
export default reducer;
