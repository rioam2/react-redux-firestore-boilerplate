import Firebase from 'firebase';
import firestoreDB from '../firestore';
import firebaseDB from '../firebase';

const database = {
	/**
	 *  Allows you to set the value of data on the firestore database.
	 *  This data flows back into the application through redux state.
	 *  @author rioam2
	 *  @param  {[String]} fieldString Field to update in 'dot-notation'.
	 *  														 Ex: `${StoreName}.field.subField`
	 *  														 Ex: settingsData.darkMode
	 *  @param  {[type]} value       The value to assign to the specified
	 *  														 field. Can be any datatype.
	 */
	set: (fieldString, value) => {
		if (firebaseDB.auth().currentUser) {
			const [store, ...fieldpath] = fieldString.split('.');
			const field = firestoreDB.doc(
				`/users/${firebaseDB.auth().currentUser.uid}/${store}/data`
			);
			field.update({
				[`${fieldpath.join('.')}`]: value
			});
		}
	},

	/**
	 *  Allows you to delete an entry or field from the remote firestore database
	 *  This is done using the set method above.
	 *  @author rioam2
	 *  @param  {[String]} fieldString Field to update in 'dot-notation'.
	 *  														 Ex: `${StoreName}.field.subField`
	 *  														 Ex: settingsData.darkMode
	 */
	delete: fieldString => {
		database.set(fieldString, Firebase.firestore.FieldValue.delete());
	}
};

export default database;
