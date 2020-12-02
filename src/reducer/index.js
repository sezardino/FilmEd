import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';

import logicReducer from './logics';
import dataReducer from './home-page';
import showReducer from './show-page';
import personReducer from './person-page';
import searchReducer from './search';
import {ActionCreator as logicCreator, ActionType as logicType} from './logics';
import {
	ActionCreator as homeCreator,
	ActionType as homeType,
	ThunkCreator as HomeThunk,
} from './home-page';
import {
	ActionCreator as showCreator,
	ActionType as showType,
	ThunkCreator as ShowThunk,
} from './show-page';
import {
	ActionCreator as personCreator,
	ActionType as personType,
	ThunkCreator as PersonThunk,
} from './person-page';
import {
	ActionCreator as searchCreator,
	ActionType as searchType,
	ThunkCreator as SearchThunk,
} from './search';

const ActionType = {
	...logicType,
	...homeType,
	...showType,
	...personType,
	...searchType,
};

const ActionCreator = {
	...logicCreator,
	...homeCreator,
	...showCreator,
	...personCreator,
	...searchCreator,
};

const ThunkCreator = {
	...HomeThunk,
	...PersonThunk,
	...SearchThunk,
	...ShowThunk,
};

const reducer = combineReducers({
	logic: logicReducer,
	data: dataReducer,
	show: showReducer,
	search: searchReducer,
	person: personReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export {ActionType, ActionCreator, ThunkCreator};
export default store;
