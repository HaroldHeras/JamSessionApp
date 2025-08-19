
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  
dotenv.config({path: __dirname + "/../../.env"});



export class Configuration{


    static getPort(){

        const {PORT = 4321} = process.env;
        
        return PORT;

    }


    static getRootCredentials(){

        const {ROOT_USER, ROOT_PASS} = process.env;

        return {ROOT_USER, ROOT_PASS};

    }


    static getSecret(){

        const {SECRET_JWT_KEY} = process.env;

        return SECRET_JWT_KEY;

    }


}