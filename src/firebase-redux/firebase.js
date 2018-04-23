import firebase from 'firebase';
import 'firebase/firestore';

/* Load the firebase configuration from process environment */
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECTID
};

/* Instantiate firebase */
const firebaseDB = firebase.initializeApp(firebaseConfig);

/* Export firebase */
export default firebaseDB;
