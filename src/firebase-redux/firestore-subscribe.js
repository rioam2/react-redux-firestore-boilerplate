import firebaseDB from './firebase';
import stores from './stores';
import firestoreDB from './firestore';
import store from './store';

/* Subscribe redux to each store */
firebaseDB.auth().onAuthStateChanged(user => {
	if (user) {
		stores.map(storeName => {
			const storeDocument = firestoreDB.doc(
				`/users/${user.uid}/${storeName}/data`
			);
			storeDocument.get().then(docSnapshot => {
				if (!docSnapshot.exists) {
					/* If the firebase store does not exist yet, create it */
					storeDocument.set({});
				}
				/* Listen to the document and update redux store when changed */
				storeDocument.onSnapshot(doc => {
					const data = {
						type: `${storeName}_FETCH`,
						payload: doc.data()
					};
					store.dispatch(data);
				});
			});
			return storeDocument;
		});
	}
});
