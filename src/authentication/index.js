import firebase from 'firebase';
import firebaseDB from '../firebase-redux/firebase';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const authentication = {
	googleAuth: () =>
		firebaseDB
			.auth()
			.signInWithPopup(googleProvider)
			.then(result => {
				/* eslint-disable-next-line */
				console.log(`Successfully logged in :: ${result.credential}`);
			})
			.catch(error => {
				const { code, message } = error;
				/* eslint-disable-next-line */
				console.log(`Authentication failed: ${code} :: ${message}`);
			})
};

export default authentication;
