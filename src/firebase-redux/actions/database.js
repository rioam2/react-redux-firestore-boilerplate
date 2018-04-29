import Firebase from 'firebase';
import firestoreDB from '../firestore';
import firebaseDB from '../firebase';

const database = {
	set: (fieldString, value) => {
		const [store, ...fieldpath] = fieldString.split('.');
		const field = firestoreDB.doc(
			`/users/${firebaseDB.auth().currentUser.uid}/${store}/data`
		);
		field.update({
			[`${fieldpath.join('.')}`]: value
		});
	},
	delete: fieldString => {
		database.set(fieldString, Firebase.firestore.FieldValue.delete());
	}
};

export default database;
