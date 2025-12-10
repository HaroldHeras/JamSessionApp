

import { Servidor } from "./server/servidor.js";
//import { LocalRepository as Repositorio} from "./ddbb/models/db-local/local-repository.js";
import {FirestoreRepository as Repositorio} from "./ddbb/models/firestore-db/firestore-repository.js"





const DBModel = new Repositorio();

const servidor = new Servidor(DBModel);
servidor.listen();





