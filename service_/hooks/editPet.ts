import { ref, update } from 'firebase/database';
import { db } from '@/firebaseConfig';

const updatePet = async (pet: Pets): Promise<void> => {
  const dbRef = ref(db, `${pet.id}`);
  try {
    await update(dbRef, {
      name: pet.name,
      age: pet.age,
      gender: pet.gender
    });
    console.log('pet updated successfully');
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

export default updatePet;
