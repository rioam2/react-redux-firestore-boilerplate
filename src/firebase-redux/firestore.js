import firebaseDB from './firebase';

/* Intitialize the firestore database */
const firestoreDB = firebaseDB.firestore();
firestoreDB.settings({
	timestampsInSnapshots: true
});

/* Export the firestore database */
export default firestoreDB;
