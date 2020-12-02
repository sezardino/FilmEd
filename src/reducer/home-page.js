import {tabs, SOURCE} from '../const/const';
import {api} from '../api';

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
	GET_DATA: 'GET_DATA',
	GET_HERO_BG: 'GET_HERO_BG',
	CHANGE_TAB: 'CHANGE_TAB',
};

const ActionCreator = {
	GET_DATA: (data) => ({type: ActionType.GET_DATA, payload: data}),
	GET_HERO_BG: () => ({type: ActionType.GET_HERO_BG}),
	CHANGE_TAB: (tab) => ({type: ActionType.CHANGE_TAB, payload: tab}),
};

const ThunkCreator = {
	getHPData: (language) => async (dispatch) => {
		await api[language].getPopular().then((data) => dispatch(ActionCreator.GET_DATA(data)));
		await api[language].getTrends().then((data) => dispatch(ActionCreator.GET_DATA(data)));
		dispatch(ActionCreator.GET_HERO_BG());
	},
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

const getBG = ({data}) => {
	const {onTv, inTheaters} = data;
	if (onTv && inTheaters) {
		const number = Math.floor(Math.random() * 20);
		if (Math.random() > 0.5) {
			const bg = onTv[number].background;
			return bg;
		} else {
			const bg = inTheaters[number].background;
			return bg;
		}
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.GET_DATA:
			return getData(state, action);
		case ActionType.GET_HERO_BG:
			const bg = getBG(state.popular);
			return {...state, background: bg};
		case ActionType.CHANGE_TAB:
			return changeTab(state, action.payload);
		default:
			return state;
	}
};

export {ActionCreator, ActionType, ThunkCreator};
export default reducer;
