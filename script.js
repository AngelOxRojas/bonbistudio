document.addEventListener("DOMContentLoaded", function () {

    const preguntas = document.querySelectorAll(".pregunta");

    preguntas.forEach(function (pregunta) {

        pregunta.addEventListener("click", function () {

            const item = this.parentElement;
            const respuesta = item.querySelector(".respuesta");

            document.querySelectorAll(".item").forEach(function (otro) {

                if (otro !== item) {

                    otro.classList.remove("activo");
                    otro.querySelector(".respuesta").style.maxHeight = null;

                }

            });

            if (item.classList.contains("activo")) {

                item.classList.remove("activo");
                respuesta.style.maxHeight = null;

            } else {

                item.classList.add("activo");
                respuesta.style.maxHeight = respuesta.scrollHeight + "px";

            }

        });

    });

});

function enviarFormulario() {

    const formulario = document.getElementById("formulario");

    if (formulario.checkValidity()) {

        formulario.reset();

        const mensaje = document.getElementById("mensajeExito");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 3800);

    } else {

        formulario.reportValidity();

    }

}

function mostrarProductos() {

    const productos = document.querySelectorAll(".card-producto");

    productos.forEach(producto => {

        const posicion = producto.getBoundingClientRect().top;

        if (posicion < window.innerHeight - 100) {
            producto.classList.add("mostrar");
        }

    });

}

window.addEventListener("load", mostrarProductos);
window.addEventListener("scroll", mostrarProductos);


function abrirFavoritos(){

    document
        .getElementById("panelFavoritos")
        .classList
        .add("activo");

}
function cerrarFavoritos(){

    document
        .getElementById("panelFavoritos")
        .classList
        .remove("activo");

}

// Array de favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Abrir y cerrar panel
function toggleFavoritos() {

    document.getElementById("panelFavoritos").classList.toggle("activo");

}

function agregarFavorito(producto){

    if(favoritos.includes(producto)){

        alert("Este producto ya está en tus favoritos.");
        return;

    }

    favoritos.push(producto);

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    actualizarFavoritos();

    abrirFavoritos();

    mostrarMensajeFavorito();

}

function eliminarFavorito(indice){

    favoritos.splice(indice,1);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    actualizarFavoritos();

}



function actualizarFavoritos(){

    const lista = document.getElementById("listaFavoritos");

    lista.innerHTML = "";

    if(favoritos.length === 0){

        lista.innerHTML = `
            <div class="sinFavoritos">

                <p>No tienes productos favoritos.</p>

                <small>Agrega algunos desde el catálogo.</small>

            </div>
        `;

        return;

    }
    window.onload = actualizarFavoritos;

    favoritos.forEach(function(producto, indice){

       lista.innerHTML += `
    <li class="itemFavorito">

        <span>❤️ ${producto}</span>

        <button class="btnEliminar"
                onclick="eliminarFavorito(${indice})">

            ✕

        </button>

    </li>


        `;

    });

}

window.onload = actualizarFavoritos;



function mostrarMensajeFavorito(){

    const mensaje = document.getElementById("mensajeFavorito");

    mensaje.classList.add("mostrar");

    setTimeout(function(){

        mensaje.classList.remove("mostrar");

    },2500);

}


function animarContadores() {

    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(function(contador) {

        const objetivo = parseInt(contador.dataset.numero);
        let numero = 0;

        const incremento = objetivo / 80;

        const intervalo = setInterval(function() {

            numero += incremento;

            if (numero >= objetivo) {
                numero = objetivo;
                clearInterval(intervalo);
            }

            contador.textContent = Math.floor(numero);

        }, 20);

    });

}

let contadoresAnimados = false;

function activarContadores() {

    const seccion = document.querySelector(".estadisticas");

    const posicion = seccion.getBoundingClientRect().top;

    if (posicion < window.innerHeight - 100 && !contadoresAnimados) {

        contadoresAnimados = true;

        animarContadores();

    }

}

window.addEventListener("load", activarContadores);
window.addEventListener("scroll", activarContadores);

function abrirMenu(){

    document.getElementById("menu").classList.toggle("activo");

}