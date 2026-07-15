/*=========================================
            PRODUCTOS
=========================================*/

const productos = [
    {
        id: 1,
        nombre: "Control",
        precio: 100
    },
    {
        id: 2,
        nombre: "Mortal Kombat",
        precio: 70
    },
    {
        id: 3,
        nombre: "Mario Pixel",
        precio: 20
    }
];

/*=========================================
            VARIABLES
=========================================*/

const IVA = 0.21;

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*=========================================
            DOM
=========================================*/

const listaCarrito = document.getElementById("lista-carrito");
const subtotalElemento = document.getElementById("subtotal");
const ivaElemento = document.getElementById("iva");
const totalElemento = document.getElementById("total");
const mensajeElemento = document.getElementById("mensaje");
const botonVaciar = document.getElementById("vaciar");
const botonComprar = document.getElementById("comprar");
const contador = document.getElementById("contador-carrito");

/*=========================================
        AGREGAR PRODUCTO
=========================================*/

function agregarProducto(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    const existe = carrito.find(p => p.id === id);

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    guardarCarrito();

    mostrarMensaje("Producto agregado al carrito");

    renderizarCarrito();

}

/*=========================================
        CAMBIAR CANTIDAD
=========================================*/

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }

    guardarCarrito();

    renderizarCarrito();

}

/*=========================================
        ELIMINAR
=========================================*/

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito();

    mostrarMensaje("Producto eliminado");

    renderizarCarrito();

}

/*=========================================
        VACIAR
=========================================*/

function vaciarCarrito() {

    carrito = [];

    guardarCarrito();

    renderizarCarrito();

    mostrarMensaje("Carrito vaciado");

}

/*=========================================
        GUARDAR
=========================================*/

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}

/*=========================================
        TOTALES
=========================================*/

function actualizarTotales() {

    let subtotal = 0;

    carrito.forEach(item => {

        subtotal += item.precio * item.cantidad;

    });

    const iva = subtotal * IVA;

    const total = subtotal + iva;

    subtotalElemento.textContent = subtotal.toFixed(2);

    ivaElemento.textContent = iva.toFixed(2);

    totalElemento.textContent = total.toFixed(2);

}

/*=========================================
        CONTADOR
=========================================*/

function actualizarContador() {

    if (!contador) return;

    let cantidad = 0;

    carrito.forEach(item => {

        cantidad += item.cantidad;

    });

    contador.textContent = cantidad;

}

/*=========================================
        MENSAJES
=========================================*/

function mostrarMensaje(texto) {

    if (!mensajeElemento) return;

    mensajeElemento.textContent = texto;

    clearTimeout(mostrarMensaje.timer);

    mostrarMensaje.timer = setTimeout(() => {

        mensajeElemento.textContent = "";

    }, 2000);

}

/*=========================================
        RENDERIZAR
=========================================*/

function renderizarCarrito() {

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";

        actualizarTotales();

        actualizarContador();

        return;

    }

    carrito.forEach(item => {

        const div = document.createElement("div");

        div.classList.add("item-carrito");

        div.innerHTML = `
            <h4>${item.nombre}</h4>

            <p>$${item.precio}</p>

            <button onclick="cambiarCantidad(${item.id},-1)">−</button>

            <span>${item.cantidad}</span>

            <button onclick="cambiarCantidad(${item.id},1)">+</button>

            <button onclick="eliminarProducto(${item.id})">
                Eliminar
            </button>

            <hr>
        `;

        listaCarrito.appendChild(div);

    });

    actualizarTotales();

    actualizarContador();

}

/*=========================================
        COMPRAR
=========================================*/

function confirmarCompra() {

    if (carrito.length === 0) {

        mostrarMensaje("Agrega productos primero.");

        return;

    }

    alert("¡Gracias por tu compra!");

    carrito = [];

    guardarCarrito();

    renderizarCarrito();

}

/*=========================================
        EVENTOS
=========================================*/

if (botonVaciar) {

    botonVaciar.addEventListener("click", vaciarCarrito);

}

if (botonComprar) {

    botonComprar.addEventListener("click", confirmarCompra);

}

/*=========================================
        INICIO
=========================================*/

renderizarCarrito();
