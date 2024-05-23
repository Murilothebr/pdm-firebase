import { getDatabase, ref, remove } from 'firebase/database';
import { db } from '@/firebaseConfig';

const deletePets = async (petId: number): Promise<void> => {
  const dbRef = ref(db, `/${petId}`);
  try {
    await remove(dbRef);
    console.log(`Pet with id ${petId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
};

export default deletePets;
