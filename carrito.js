const productos = [

  {
    "id": 1,
    "nombre": "logovideojuego",
    "precio": 30,
    "img": "logovideojuego.jpg.png"
  },

  {
    "id": 2,
    "nombre": "logoMortalKombat",
    "precio": 30,
    "img": "img/logoMortalKombat.jpg.png"
  },

  {
    "id": 3,
    "nombre": "logo control",
    "precio": 30,
    "img": "img/logocontrol.jpg"
  }
  
];

        /*=====================================================
                VARIABLES
=====================================================*/

const IVA = 0.21;

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];


/*=====================================================
            REFERENCIAS AL DOM
=====================================================*/

const listaCarrito =
    document.getElementById("lista-carrito");

const subtotalElemento =
    document.getElementById("subtotal");

const ivaElemento =
    document.getElementById("iva");

const totalElemento =
    document.getElementById("total");

const mensajeElemento =
    document.getElementById("mensaje");

const botonVaciar =
    document.getElementById("vaciar");

const botonComprar =
    document.getElementById("comprar");


/*=====================================================
            AGREGAR PRODUCTOS
=====================================================*/

function agregarProducto(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );

    if (!producto) return;

    const existe =
        carrito.find(
            item => item.id === id
        );

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            emoji: producto.emoji,
            cantidad: 1
        });

    }

    mostrarMensaje(
        `${producto.emoji} ${producto.nombre} agregado al carrito`
    );

    renderizarCarrito();

  }

  /*=====================================================
            MOSTRAR CARRITO
=====================================================*/

function renderizarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            `
            <p class="vacio">
                El carrito está vacío.
            </p>
            `;

        actualizarTotales();

        return;

    }

    carrito.forEach(item => {

        const subtotalProducto =
            item.precio * item.cantidad;

        const contenedor =
            document.createElement("div");

        contenedor.classList.add(
            "item-carrito"
        );

        contenedor.innerHTML =
            `
            <h4>
                ${item.emoji} ${item.nombre}
            </h4>

            <p>
                $${subtotalProducto}
            </p>

            <div class="controles">

                <button
                onclick="cambiarCantidad(${item.id}, -1)">
                -
                </button>

                <span>
                    ${item.cantidad}
                </span>

                <button
                onclick="cambiarCantidad(${item.id}, 1)">
                +
                </button>

            </div>

            <button
            onclick="eliminarProducto(${item.id})">
            Eliminar
            </button>
            `;

        listaCarrito.appendChild(
            contenedor
        );

    });

    actualizarTotales();

}

/*=====================================================
            CAMBIAR CANTIDAD
=====================================================*/

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(
            item => item.id === id
        );

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }

    renderizarCarrito();

}

/*=====================================================
            ELIMINAR PRODUCTO
=====================================================*/

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            item => item.id !== id
        );

    mostrarMensaje(
        "Producto eliminado"
    );

    renderizarCarrito();

}

/*=====================================================
            MENSAJES TEMPORALES
=====================================================*/

function mostrarMensaje(texto) {

    mensajeElemento.textContent =
        texto;

    clearTimeout(
        mostrarMensaje.temporizador
    );

    mostrarMensaje.temporizador =
        setTimeout(() => {

            mensajeElemento.textContent =
                "";

        }, 3000);
      }

      /*=====================================================
            CONFIRMAR COMPRA
=====================================================*/

function confirmarCompra() {

    if (carrito.length === 0) {

        mostrarMensaje(
            "⚠️ Agrega productos primero"
        );

        return;

    }

    alert(

"🐾 ¡Gracias por comprar en La Tienda de Videojuegos !\n\nEspero volver a verte pronto."

);

    carrito = [];

    renderizarCarrito();

}

/*=====================================================
            EVENTOS
=====================================================*/

botonVaciar.addEventListener(
    "click",
    vaciarCarrito
);

botonComprar.addEventListener(
    "click",
    confirmarCompra
);

/*=====================================================
            INICIO
=====================================================*/

renderizarCarrito()
const contador =
document.getElementById("contador");
function actualizarContador(){

    let cantidad = 0;

    carrito.forEach(item=>{

        cantidad += item.cantidad;

    });

    contador.textContent = cantidad;

}
actualizarContador();
localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
);
const buscador =
document.getElementById("buscar");

buscador.addEventListener("keyup", filtrarProductos);

function filtrarProductos(){

    const texto =
    buscador.value.toLowerCase();

    const tarjetas =
    document.querySelectorAll(".tarjeta-producto");

    tarjetas.forEach(tarjeta=>{

        const nombre =
        tarjeta.querySelector("h3")
        .textContent
        .toLowerCase();

        if(nombre.includes(texto)){

            tarjeta.style.display="block";

        }

        else{

            tarjeta.style.display="none";

        }

    });

}
const arriba =
document.getElementById("arriba");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        arriba.style.display="block";

    }

    else{

        arriba.style.display="none";

    }

});

arriba.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
   
