import firestoreDB from './firestore';
import firebaseDB from './firebase';
import stores from './stores';
import store from './store';

// Listen for authentication changes.
firebaseDB.auth().onAuthStateChanged(user => {
	if (user) {
		/*
		 *  User has signed in. Subscribe the redux store to reflect
		 *  changes on the realtime firestore by dispatching actions
		 *  to respective reducers on each new snapshot. If the remote
		 *  stores do not exist, they must be first created with set();.
		 */
		// Fetch actions
		stores.forEach(storeName => {
			const storeDocument = firestoreDB.doc(
				`/users/${user.uid}/${storeName}/data`
			);
			storeDocument.get().then(docSnapshot => {
				if (!docSnapshot.exists) {
					storeDocument.set({});
				}
				storeDocument.onSnapshot(doc => {
					const data = {
						type: `${storeName}_FETCH`,
						payload: doc.data()
					};
					store.dispatch(data);
				});
			});
		});
		// Signin Action
		store.dispatch({
			type: 'AUTH_LOGIN',
			payload: firebaseDB.auth().currentUser.providerData[0]
		});
		/*
		 *  Your custom sign-in code will be executed here:
		 */
	} else {
		/*
		 *  User has signed out of the application. The following
		 *  block will be executed. Put your additional sign-out logic here.
		 */
		// Signout Action
		store.dispatch({
			type: 'AUTH_LOGOUT'
		});
	}
});
