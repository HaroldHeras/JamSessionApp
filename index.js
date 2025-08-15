

import { initServidor } from "./server/servidor.js";
import { LocalRepository } from "./ddbb/models/db-local/local-repository.js";





const DBModel = new LocalRepository();

initServidor(DBModel);




