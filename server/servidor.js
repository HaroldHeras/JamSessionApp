

import express from "express";
import path from "path"
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {Configuration} from "./services/configuration.js";
import {RootService} from "./../ddbb/services/rootService.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  



export class Servidor{

  #app;
  #angularPath;
  #DBModel;
  #PORT
  #SECRET_JWT_KEY
  

  constructor(DBModel){

    this.#PORT = Configuration.getPort();
    this.#SECRET_JWT_KEY = Configuration.getSecret();
    this.#app = express();
    this.#angularPath = path.join(__dirname, "../client/public/front/dist/front/browser");
    this.#DBModel = DBModel;
    this.middlewares();
    this.jamRoutes();
    this.routes();
    RootService.creaRootUser(Configuration.getRootCredentials(), this.#DBModel);



  }


  middlewares(){

    this.#app.disable("x-powered-by");
    this.#app.use(express.json());
    this.#app.use(cookieParser());
    this.#app.use(express.static(this.#angularPath))
    this.#app.use((req,res,next)=>{

      const token = req.cookies.control_token;

      req.session = {id: null, username: null, superUsuario:false};
      try{

        const data = jwt.verify(token, this.#SECRET_JWT_KEY);
        req.session = {id: data.id, username: data.username, superUsuario: data.superUsuario};

      }catch{}

      next();

    }) 


  }



  routes(){

    this.#app.post("/signin", async (req,res)=>{

        
      if(!req.session.superUsuario)  return res.status(401).send("No autorizado para esta accion");
      
      const usuarioNuevo = req.body;
    
    
      try{
    
        const idUsuarioNuevo = await this.#DBModel.creaUsuario(usuarioNuevo)  
    
        res.status(201).json({idUsuarioNuevo});
    
      }catch(error){
        res.status(400).send(error.message);
      } 
  
  
    })  
  
  
  
   
  
  
    this.#app.post("/login", async (req,res)=>{
  
      const {username, password} = req.body;
  
      try{
  
        const usuarioVerificado = await this.#DBModel.logIn({username, password});
        const token = jwt.sign({id:usuarioVerificado._id, username: usuarioVerificado.username, superUsuario: usuarioVerificado.superUsuario}, this.#SECRET_JWT_KEY, {expiresIn: "1d"});
  
  
        res.status(200).cookie("control_token", token,{
          httpOnly: true,
          secure: true,
          sameSite:"strict",
          maxAge: 1000 * 60 * 60 * 24
        })
        .send({ok:true, usuarioVerificado});
  
      }catch(error){
  
        res.status(401).json({ok: false, message: error.message});
  
      } 
  
    })
  
  
    this.#app.get("/session",(req,res)=>{

    
      const session = {...req.session};       
        
      if(!session.id) return res.status(401).send("No autorizado");
      
      return res.status(200).send(session);
        
    })
  
  
    this.#app.use((req, res) => {
    
      res.sendFile(path.join(this.#angularPath, "index.html"));
    });


  }



  jamRoutes(){


    this.#app.post("/jams", async (req,res)=>{

      if(!req.session.superUsuario) return res.status(401).send("No autorizado para esta accion");

      try{
        const {nombre} = req.body;
        const idJam = await this.#DBModel.creaJam(nombre);
        return res.status(201).json({ok: true, id: idJam});
      }catch(error){
        return res.status(400).send({ok: false, message:error.message})
      }


    })

    this.#app.get("/jams", async (req,res)=>{

      const jams = await this.#DBModel.getJamsAll();

      if(!jams) return res.status(204)
      
      return jams;


    })


  }

  listen(){

    this.#app.listen(this.#PORT, ()=>{
        console.log(`Todo listo en el puerto ${this.#PORT}`);
    });

  }


}




