import firebase from 'firebase';
import firebaseDB from '../firebase';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const auth = {
	/* General Authentication methods */
	signOut: () => firebaseDB.auth().signOut(),
	getCurrentUser: () => firebaseDB.auth().currentUser,

	/* Google Authentication */
	/* Please enable Google authentication in the
		 Firebase console for this flow to function correctly */
	googleAuth: () => firebaseDB.auth().signInWithPopup(googleProvider)
};

export default auth;
