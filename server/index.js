

import express from "express";

import path from "path"
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { UserRepository } from "../ddbb/user-repository.js";






const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: __dirname + "/.env"});




const {
  PORT = 1234,
  SECRET_JWT_KEY = "VALOR POR DEFECTO"
} = process.env;



const angularPath = path.join(__dirname, "../client/public/front/dist/front/browser");

const permitido=false;
const pass = "HaroldJam"



const app = express();

app.disable("x-powered-by");

app.use(express.json());


app.use(express.static(angularPath))



app.get("/user-repository",(req,res)=>{


  const primerUsuario = UserRepository.getPrimerUsuario();


  res.status(200).json(primerUsuario);


})  


app.post("/user-repository", async (req,res)=>{


  const usuarioNuevo = req.body;

  try{

    const idUsuarioNuevo = await UserRepository.creaUsuario(usuarioNuevo)  

    res.status(200).json({idUsuarioNuevo});

  }catch(error){
    res.status(400).send(error.message);
  } 


})  


app.post("/autenticacion", (req,res)=>{

  

    const {password} = req.body;


    if(password===pass){
      permitido===true

      return res.status(200).json({ok: true})
    }else{

      permitido===false;
      
      return res.status(401).json({ok: false})

    }  


})


app.get("/autenticacion",(req,res)=>{


    res.json({authorization: permitido});



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