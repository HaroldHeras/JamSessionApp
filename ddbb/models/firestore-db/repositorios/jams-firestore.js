
export class Jams{

    constructor(firestoreDb){
        this.firestoreDb = firestoreDb;
    }

    // Ejemplo: Método para obtener todas las jams
    async getJamsAll() {
        try {
            const jamsRef = this.firestoreDb.collection('jams');
            const snapshot = await jamsRef.get();
            const jams = [];
            snapshot.forEach(doc => {
                jams.push({ id: doc.id, ...doc.data() });
            });
            return jams;
        } catch (error) {
            console.error("Error al obtener jams:", error);
            throw error;
        }
    }


}