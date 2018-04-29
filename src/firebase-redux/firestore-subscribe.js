import firestoreDB from './firestore';
import firebaseDB from './firebase';
import stores from './stores';
import store from './store';

/**
 *  This file handles linkage between firebase and redux's reducers.
 *  Upon sign-in, event listeners are attached to each firestore document
 *  listed in stores.js. When a new snapshot is issued from firestore, a
 *  redux action is dispatched to a corresponding fetch reducer and the
 *  local state is updated.
 *  Upon sign-out, the user is first detached from the local store, and then
 *  all of their local stores are removed by distpaching DETACH actions to redux.
 *  Finally, the snapshot listeners are removed, so no new data is pushed locally.
 *
 *  @author rioam2
 */

// Array for containing each store listener for sign-out flow
const documentListeners = [];

// Listen for authentication changes.
firebaseDB.auth().onAuthStateChanged(user => {
	if (user) {
		// Handle user sign in flow
		// Listen for new snapshots and dispatch fetch actions to redux
		stores.forEach(storeName => {
			const storeDocument = firestoreDB.doc(
				`/users/${user.uid}/${storeName}/data`
			);
			// Create firestore document if needed
			storeDocument.get().then(docSnapshot => {
				if (!docSnapshot.exists) {
					storeDocument.set({});
				}
				documentListeners.push(
					storeDocument.onSnapshot(doc => {
						store.dispatch({
							type: `${storeName}_FETCH`,
							payload: doc.data()
						});
					})
				);
			});
		});
		// Sign the user in and store meta in local state
		store.dispatch({
			type: 'AUTH_LOGIN',
			payload: firebaseDB.auth().currentUser.providerData[0]
		});
	} else if (documentListeners.length) {
		// Handle sign out flow
		// Remove user meta from local state
		store.dispatch({
			type: 'AUTH_LOGOUT'
		});
		// Detach stores from local state
		stores.forEach(storeName => {
			store.dispatch({
				type: `${storeName}_DETACH`
			});
		});
		// Unsubscribe from each store listener
		documentListeners.forEach(listener => listener());
	}
});
