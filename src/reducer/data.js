import {tabs, SOURCE, LANGUAGES} from '../const';

const {POPULAR, TRENDS} = tabs;
const initialState = {
	popular: {
		data: {onTv: [], inTheater: []},
		tabs: POPULAR,
		activeTab: POPULAR.onTv,
	},
	trends: {
		data: {today: [], thisWeek: []},
		tabs: TRENDS,
		activeTab: TRENDS.today,
	},
	languages: {activeLanguage: Object.keys(LANGUAGES)[0], languages: Object.keys(LANGUAGES)},
	search: {data: []},
};

const ActionType = {
	GET_DATA: 'GET_DATA',
	CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
	CHANGE_TAB: 'CHANGE_TAB',
	SEARCH: 'SEARCH',
};

const ActionCreator = {
	GET_DATA: (data, source) => ({type: ActionType.GET_DATA, payload: data, source: source}),
	CHANGE_LANGUAGE: (language) => ({type: ActionType.CHANGE_LANGUAGE, payload: language}),
	CHANGE_TAB: (tab) => ({type: ActionType.CHANGE_TAB, payload: tab}),
	SEARCH: (data) => ({type: ActionType.SEARCH, payload: data}),
};

const changeTab = (state, tab) => {
	switch (tab) {
		case Object.values(tabs.POPULAR).find((item) => item === tab):
			return {...state, popular: {...state.popular, activeTab: tab}};
		case Object.values(tabs.TRENDS).find((item) => item === tab):
			return {...state, trends: {...state.trends, activeTab: tab}};

		default:
			break;
	}
};

const getData = (state, action) => {
	const {popular, trends} = state;
	const {trendsData, popularData, source} = action.payload;
	switch (source) {
		case SOURCE.POPULAR:
			return {...state, popular: {...popular, data: popularData}};
		case SOURCE.TRENDS:
			return {...state, trends: {...trends, data: trendsData}};
		default:
			break;
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.GET_DATA:
			return getData(state, action);
		case ActionType.CHANGE_LANGUAGE:
			return {...state, languages: {...state.languages, activeLanguage: action.payload}};
		case ActionType.CHANGE_TAB:
			return changeTab(state, action.payload);
		case ActionType.SEARCH:
			return {...state, search: {data: action.payload}};
		default:
			return state;
	}
};

export {ActionCreator, ActionType};
export default reducer;
