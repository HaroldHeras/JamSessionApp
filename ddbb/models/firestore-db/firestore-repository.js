// Asegúrate de que la ruta sea correcta y que este archivo NO esté en tu repositorio público.
import serviceAccount from './firebase-credentials.json' with  { type: "json" };
import admin from 'firebase-admin';
import {Users} from "./repositorios/users-firestore.js";
import {Jams} from "./repositorios/jams-firestore.js";

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export class FirestoreRepository {


    constructor() {
        // Obtiene una referencia a la base de datos de Firestore
        this.firestoreDb = admin.firestore();
        this.users = new Users(this.firestoreDb);
        this.jams = new Jams(this.firestoreDb);
        console.log("FirestoreRepository inicializado y conectado a la base de datos.");
    }

    

    

    // Ejemplo: Método para crear una nueva jam
    async createJam(jamData) {
        try {
            const docRef = await this.firestoreDb.collection('jamsessions').add(jamData);
            console.log("Jam creada con ID:", docRef.id);
            return { id: docRef.id, ...jamData };
        } catch (error) {
            console.error("Error al crear jam:", error);
            throw error;
        }
    }

    // Aquí añadirías más métodos para interactuar con tus colecciones (users, songs, etc.)
}
