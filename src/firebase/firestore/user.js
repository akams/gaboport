import { useCollectionData } from 'react-firebase-hooks/firestore';

export async function create(firestore, parameter) {
  const { uid, email } = parameter;
  console.log({ firestore, parameter })
  const userRef = firestore.collection('users');
  console.log({ userRef })
  return await userRef.add({
    uid,
    email
  });
}