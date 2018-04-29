import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from './firebase-redux/actions/auth';
import database from './firebase-redux/actions/database';

const App = props => (
	<div>
		<h1>React-Redux-Firestore-Boilerplate</h1>
		<h2>
			{(props.user.isLoggedIn &&
				`${props.user.data.displayName}, you are logged in`) ||
				'Please log in.'}
		</h2>
		<button onClick={() => auth.googleAuth()} type="button">
			Sign in
		</button>
		<button onClick={() => auth.signOut()} type="button">
			Sign out
		</button>
		<button onClick={() => database.delete('settingsData.test')} type="button">
			Update Database
		</button>
	</div>
);
App.propTypes = {
	user: PropTypes.shape({
		isLoggedIn: PropTypes.bool.isRequired,
		data: PropTypes.shape({
			displayName: PropTypes.string.isRequired
		})
	}).isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	settingsData: state.settingsData
});
export default connect(mapStateToProps, null)(App);
