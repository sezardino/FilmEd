import dataReducer from './data';
import showReducer from './show-page';
import {ActionCreator as dataCreator, ActionType as dataType} from './data';
import {ActionCreator as showCreator, ActionType as showType} from './show-page';

import {combineReducers} from 'redux';

const ActionType = {
	...dataType,
	...showType,
};

const ActionCreator = {
	...dataCreator,
	...showCreator,
};

export {ActionType, ActionCreator};
export default combineReducers({
	data: dataReducer,
	show: showReducer,
});
