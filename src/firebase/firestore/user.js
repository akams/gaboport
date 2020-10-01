import { useCollectionData } from 'react-firebase-hooks/firestore';

/**
 * Creer un document
 * @param {*} firestore 
 * @param {*} parameter 
 */
export async function create(firestore, parameter) {
  const { uid, email } = parameter;
  const userRef = firestore.collection('users');
  return await userRef.add({
    uid,
    email
  });
}

/**
 * Récupère le dernier élément enregistrer
 * @param {*} firestore 
 */
export async function getLastInsert(firestore, uid) {
  let user = { id: null };
  const userRef = firestore.collection('users');
  const querySnapshot = await userRef
    .where("uid", "==", uid)
    .get();

  querySnapshot.forEach(function(doc) {
    user.id = doc.id;
    user.data = doc.data();
  });
  return user;
}