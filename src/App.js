import React from 'react';
import { connect } from 'react-redux';
import authentication from './authentication';

const App = props => {
	const { user } = props; /* eslint-disable-line */
	return (
		<div>
			<h1>Hello, {user.name}</h1>
			<button onClick={() => authentication.googleAuth()} type="button">
				Sign in
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.userData,
	settings: state.settingsData
});
export default connect(mapStateToProps, null)(App);
