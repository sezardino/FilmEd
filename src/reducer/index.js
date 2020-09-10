import dataReducer from './data';
import {ActionCreator as dataCreator, ActionType as dataType} from './data';
import {combineReducers} from 'redux';

const ActionType = {
	...dataType,
};

const ActionCreator = {
	...dataCreator,
};

// const reducer = (state, action) => {
// 	return {
// 		data: dataReducer(state, action),
// 	};
// };

export {ActionType, ActionCreator};
export default combineReducers({
	data: dataReducer,
});
