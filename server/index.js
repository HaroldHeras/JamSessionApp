

import express from "express";

import path from "path"
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { UserRepository } from "../ddbb/user-repository.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";






const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: __dirname + "/.env"});




const {
  PORT = 1234,
  SECRET_JWT_KEY = "VALOR POR DEFECTO"
} = process.env;



const angularPath = path.join(__dirname, "../client/public/front/dist/front/browser");





const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());


app.use(express.static(angularPath))





app.post("/user-repository", async (req,res)=>{


  const usuarioNuevo = req.body;


  try{

    const idUsuarioNuevo = await UserRepository.creaUsuario(usuarioNuevo)  

    res.status(201).json({idUsuarioNuevo});

  }catch(error){
    res.status(400).send(error.message);
  } 


})  



app.get("/superUsuario",(req,res)=>{


  const superUsuario = UserRepository.getSuperUsuario();

  if(superUsuario)  res.status(200).json({superUsuario : superUsuario.username});

  if(!superUsuario) res.status(204).send("No hay superusuario")




})  


app.post("/login", async (req,res)=>{

  
    const {username, password} = req.body;

    try{

      const usuarioVerificado = await UserRepository.logIn({username, password});
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


app.post("/register",(req,res)=>{
  console.log(req.body)
  console.log(process.env)
  res.status(200);
})




// app.get("/LogIn",(req,res)=>{


    
//     res.sendFile(path.join(__dirname, "../client/public/front/dist/front/browser/index.html"));



// })





// app.get("/",(req,res, next)=>{


//     if(!permitido){
//         res.status(200).sendFile(path.join(__dirname, "../client/private/pages/LogIn.html"));
//     }else{
//         res.status(200).sendFile(path.join(__dirname, "../client/private/pages/index.html"));

//     }

    
// })


// app.post("/", (req,res)=>{


//     if(req.body.password===pass){
//         permitido = true;
//         res.status(200).json({ message: "ok"})
//     }else{
//         res.status(401).json({ message: "denied"})        
//     }

// });


// //Sirve el archivo JS necesario para su página html
// app.get("/client/private/src/LogIn.js",(req,res)=>{


    
//     res.sendFile(path.join(__dirname, "../client/private/src/LogIn.js"));



// })

// //Sirve el archivo JS necesario para su página html
// app.get("/client/private/src/index.js",(req,res)=>{


    
//     res.sendFile(path.join(__dirname, "../client/private/src/index.js"));



// })


 



// app.get("/jamController", (req,res,next)=>{

//     if(permitido){
//         return res.sendFile(path.join(__dirname, "../client/private/pages/jamController.html"))
//     }else{
//         next();
//     }


// })


// app.get("/espectador", (req,res, next)=>{

//     if(permitido){
//         return res.sendFile(path.join(__dirname, "../client/private/pages/espectador.html"))
//     }else{
//         next();
//     }

// })


// app.get("/musico", (req,res, next)=>{

//     if(permitido){
//         return res.sendFile(path.join(__dirname, "../client/private/pages/musico.html"))
//     }else{
//         next();
//     }

// })












// // app.use((req,res)=>{
// //     res.sendFile(path.join(__dirname, "../client/private/pages/404.html"))
// // })




app.use((req, res) => {

  res.sendFile(path.join(angularPath, "index.html"));
});



app.listen(PORT, ()=>{
    console.log(`Todo listo en el puerto ${PORT}`);
});