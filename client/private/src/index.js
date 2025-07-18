


const botonEspectador = document.querySelector(".boton-espectador");

const botonMusico = document.querySelector(".boton-musico");

document.addEventListener("DOMContentLoaded", ()=>{


    botonEspectador.addEventListener("click", ()=>{


        window.location.href = "/espectador";


    })


    botonMusico.addEventListener("click", ()=>{


        window.location.href = "/musico";


    })





});