import logicReducer from './logics';
import dataReducer from './home-page';
import showReducer from './show-page';
import personReducer from './person-page';
import searchReducer from './search';
import {ActionCreator as logicCreator, ActionType as logicType} from './logics';
import {ActionCreator as dataCreator, ActionType as dataType} from './home-page';
import {ActionCreator as showCreator, ActionType as showType} from './show-page';
import {ActionCreator as personCreator, ActionType as personType} from './person-page';
import {ActionCreator as searchCreator, ActionType as searchType} from './search';

import {combineReducers} from 'redux';

const ActionType = {
	...logicType,
	...dataType,
	...showType,
	...personType,
	...searchType,
};

const ActionCreator = {
	...logicCreator,
	...dataCreator,
	...showCreator,
	...personCreator,
	...searchCreator,
};

export {ActionType, ActionCreator};
export default combineReducers({
	logic: logicReducer,
	data: dataReducer,
	show: showReducer,
	search: searchReducer,
	person: personReducer,
});
