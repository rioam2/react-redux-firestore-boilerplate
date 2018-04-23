import { combineReducers } from 'redux';
import stores from '../stores';

/* Define fetch reducers for redux with firestore */
const reducers = stores.map(store => {
	const initialState = { [store]: {} };
	return {
		[store]: (state = initialState, action) => {
			if (action.type === `${store}_FETCH`) {
				return { ...action.payload };
			}
			return state;
		}
	};
});

/* Combine and export the array of reducers defined above */
const rootReducer = combineReducers(Object.assign({}, ...reducers));
export default rootReducer;
