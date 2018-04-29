import { combineReducers } from 'redux';
import stores from '../stores';

/* Define Firestore Fetch Reducers */
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

/* Define a reducer to handle authentication state */
const authReducer = (state = { isLoggedIn: false }, action) => {
	if (action.type === 'AUTH_LOGIN') {
		return {
			isLoggedIn: true,
			data: action.payload
		};
	} else if (action.type === 'AUTH_LOGOUT') {
		return { isLoggedIn: false };
	}
	return state;
};

/* Combine and export the array of reducers defined above */
const rootReducer = combineReducers({
	...Object.assign({}, ...reducers),
	user: authReducer
});
export default rootReducer;
