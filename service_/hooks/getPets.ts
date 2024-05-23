import { getDatabase, ref, get, child } from 'firebase/database';
import { db } from '../../firebaseConfig';

const getPets = async (): Promise<Pets[]> => {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, '/'));
        if (snapshot.exists()) {
            const petsData = snapshot.val();
            const petsList: Pets[] = Object.keys(petsData).map((key) => ({
                id: key,
                name: petsData[key].name,
                age: petsData[key].age,
                gender: petsData[key].gender
            }));
            return petsList;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching Pets data:", error);
        throw error;
    }
};

export default getPets;