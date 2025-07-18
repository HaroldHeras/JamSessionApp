

import express from "express";

import path from "path"
import { fileURLToPath } from "node:url";

const port = process.env.PORT || 1234;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const pass = "HaroldJam";    
let permitido = false;    


const app = express();

app.disable("x-powered-by");

app.use(express.json());



app.get("/",(req,res, next)=>{


    if(!permitido){
        res.status(200).sendFile(path.join(__dirname, "../client/private/pages/LogIn.html"));
    }else{
        res.status(200).sendFile(path.join(__dirname, "../client/private/pages/index.html"));

    }

    
})



app.get("/client/private/src/LogIn.js",(req,res)=>{


    
    res.sendFile(path.join(__dirname, "../client/private/src/LogIn.js"));



})


app.get("/client/private/src/index.js",(req,res)=>{


    
    res.sendFile(path.join(__dirname, "../client/private/src/index.js"));



})


 
app.post("/", (req,res)=>{


    if(req.body.password===pass){
        permitido = true;
        res.status(200).json({ message: "ok"})
    }else{
        res.status(401).json({ message: "denied"})        
    }

});


app.get("/jamController", (req,res,next)=>{

    if(permitido){
        return res.sendFile(path.join(__dirname, "../client/private/pages/jamController.html"))
    }else{
        next();
    }


})


app.get("/espectador", (req,res, next)=>{

    if(permitido){
        return res.sendFile(path.join(__dirname, "../client/private/pages/espectador.html"))
    }else{
        next();
    }

})


app.get("/musico", (req,res, next)=>{

    if(permitido){
        return res.sendFile(path.join(__dirname, "../client/private/pages/musico.html"))
    }else{
        next();
    }

})









app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "../client/private/pages/404.html"))
})




        



app.listen(port, ()=>{
    console.log(`Todo listo en el puerto ${port}`);
});