





let password = {
    password: ""
};



document.addEventListener("DOMContentLoaded", ()=>{

    


    const botonAcceso = document.querySelector(".boton-iniciar-servicio");


    botonAcceso.addEventListener("click", async ()=>{


        

        password.password = document.querySelector(".input-password").value;


        try{

            const url = "http://localhost:1234/";
            const cabecera = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(password)
            }
             

            const respuesta = await fetch(url, cabecera);

            const resultado = await respuesta.json();

            if(resultado.message === "ok"){

                location.replace("/jamController")
            }else{

                const mensajeError = document.createElement("P");
                mensajeError.classList.add("error");
                mensajeError.textContent = "Contraseña Incorrecta";
                document.querySelector("body").appendChild(mensajeError);

                setTimeout(()=>{
                    mensajeError.remove();
                },3000);

            } 

            

        }catch(error){

        }

});


})


