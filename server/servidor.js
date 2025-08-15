

import express from "express";
import path from "path"
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  
dotenv.config({path: __dirname + "/../.env"});



export const initServidor = function(DBModel){ 

  
  const angularPath = path.join(__dirname, "../client/public/front/dist/front/browser");
  
    
  const PORT = process.env.PORT || 4321;
  
  const {
    SECRET_JWT_KEY = "VALOR POR DEFECTO",
    ROOT_USER,
    ROOT_PASS
  } = process.env;

  DBModel.creaUsuario({username:ROOT_USER, password: ROOT_PASS, superUsuario: true})
  .catch(err=>{
      if(err.message === "El usuario con ese nombre ya existe") return;
  
      throw err;
  });


  const app = express();
  
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(angularPath)) 
  
  
  
  app.post("/singin", async (req,res)=>{
  
  
    const usuarioNuevo = req.body;
  
  
    try{
  
      const idUsuarioNuevo = await DBModel.creaUsuario(usuarioNuevo)  
  
      res.status(201).json({idUsuarioNuevo});
  
    }catch(error){
      res.status(400).send(error.message);
    } 
  
  
  })  
  
  
  
   
  
  
  app.post("/login", async (req,res)=>{
  
    
      const {username, password} = req.body;
  
      try{
  
        const usuarioVerificado = await DBModel.logIn({username, password});
        const token = jwt.sign({id:usuarioVerificado._id, username: usuarioVerificado.username}, SECRET_JWT_KEY, {expiresIn: "1d"});
  
  
        res.status(200).cookie("control_token", token,{
          httpOnly: true,
          secure: true,
          sameSite:"strict",
          maxAge: 1000 * 60 * 60 * 24
        })
        .send({ok:true, usuarioVerificado, token});
  
      }catch(error){
  
        res.status(401).json({ok: false, message: error.message});
  
      } 
  
  })
  
  
  app.get("/autenticacionCookieControlador",(req,res)=>{
  
  
    const token = req.cookies.control_token;
  
  
    try{
  
      const data = jwt.verify(token, SECRET_JWT_KEY);
  
  
  
      res.status(200).send({username:data.username});
  
  
  
    }catch(error){
  
  
  
      res.status(401).send("No autorizado");
  
    }
  
  
  
  
  })
  
  
  app.use((req, res) => {
  
    res.sendFile(path.join(angularPath, "index.html"));
  });
  
  
  
  app.listen(PORT, ()=>{
      console.log(`Todo listo en el puerto ${PORT}`);
  });

}
