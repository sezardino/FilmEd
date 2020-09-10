import {tabs, SOURCE} from '../const';

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
};

const ActionType = {
	POPULAR: 'POPULAR',
	GET_DATA: 'GET_DATA',
	TRAILERS: 'TRAILERS',
	TRENDS: 'TRENDS',
	CHANGE_TAB: 'CHANGE_TAB',
};

const ActionCreator = {
	GET_DATA: (data, source) => ({type: ActionType.GET_DATA, payload: data, source: source}),
	POPULAR: (data) => ({type: ActionType.POPULAR, payload: data}),
	TRENDS: (data) => ({type: ActionType.TRENDS, payload: data}),
	TRAILERS: (data) => ({type: ActionType.TRAILERS, payload: data}),
	CHANGE_TAB: (tab) => ({type: ActionType.CHANGE_TAB, payload: tab}),
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
		case ActionType.GET_DATA: {
			return getData(state, action);
		}
		case ActionType.POPULAR: {
			const {data} = state;
			return {...data, popular: action.payload};
		}
		case ActionType.TRENDS: {
			console.log(action);
			const {data} = state;
			return {...data, trends: action.payload};
		}
		case ActionType.TRAILERS: {
			const {data} = state;
			return {...data, trailers: action.payload};
		}
		case ActionType.CHANGE_TAB:
			return changeTab(state, action.payload);
		default:
			return state;
	}
};

export {ActionCreator, ActionType};
export default reducer;
