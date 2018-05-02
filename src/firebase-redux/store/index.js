import { createStore } from 'redux';
import rootReducer from '../reducers';

/* Create Redux store and apply middleware */
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ /* eslint-disable-line */ &&
		window.__REDUX_DEVTOOLS_EXTENSION__() /* eslint-disable-line */
);

export default store;
