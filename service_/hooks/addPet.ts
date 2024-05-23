import { getDatabase, ref, push } from 'firebase/database';
import { db } from '@/firebaseConfig';

const addPet = async (pet: Omit<Pets, 'id'>): Promise<void> => {
  const dbRef = ref(db, '/');
  try {
    await push(dbRef, pet);
    console.log(pet);
    console.log('Pet added successfully');
  } catch (error) {
    console.error('Error adding Pet:', error);
    throw error;
  }
};

export default addPet;
