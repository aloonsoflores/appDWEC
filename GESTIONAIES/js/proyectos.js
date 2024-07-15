var listaProyectos = [];
cargarProyectos();

function cargarProyectos() {
    $.getJSON("proyectos.json",{},(resultado) =>{
        listaProyectos = resultado;
        mostrarProyectos(listaProyectos);
    });
}

function mostrarProyectos(lista) {
    var divCentral = document.getElementById("central");
    divCentral.innerHTML = "<h1>PROYECTOS</h1><table><tbody></tbody></table>";
    var tbody = divCentral.getElementsByTagName("tbody")[0];
    lista.forEach((proyecto) => {
        tbody.innerHTML += `<tr>
                              <td><img class="imagenTabla" src="/images/${proyecto.imagen}"></td>
                              <td>${proyecto.idProyecto}</td>
                              <td>${proyecto.idCliente}</td>
                              <td>${proyecto.nombre}</td>
                              <td>${proyecto.descripcion}</td>
                              <td>${proyecto.mostrarFechaInicio()}</td>
                              <td>${proyecto.fechaFin}</td>
                            </tr>`;
    });
}

function ordenar() {
    listaProyectos.sort((a, b) => {
        if (a.nombre > b.nombre) return 1
        else return -1;
    });
    mostrarProyectos(listaProyectos);
}

function filtrar() {
    let textoABuscar = document.getElementById("textoABuscar").value.toLowerCase();
    let listaFiltrada = listaProyectos.filter((proyecto) =>
        proyecto.nombre.toLowerCase().includes(textoABuscar));
    mostrarProyectos(listaFiltrada);
}

function imprimir() {
    window.print();
}

function cancelar() {
    location.href = "aterrizaje.html";
}

function abrirDivNuevoProyecto() {
    let divNuevoProyecto;
    if (document.getElementById("nuevoProyecto")) {
        divNuevoProyecto = document.getElementById("nuevoProyecto");
    } else {
        divNuevoProyecto = document.createElement("div");
        divNuevoProyecto.id = "nuevoProyecto";
        document.body.appendChild(divNuevoProyecto);
    }
    divNuevoProyecto.innerHTML = `<span>Nombre</span>
                                  <input type="text" id="nombreProyecto"><br>
                                  <span>Descripcion</span>
                                  <input type="text" id="descripcionProyecto"><br>
                                  <button type="button" onclick="crearProyecto()">Crear</button>
                                  <button type="button" onclick="borrarDivNuevoProyecto()">Cancelar</button></button>
                                  `
}

function crearProyecto() {
    let nombreProyecto = document.getElementById("nombreProyecto").value;
    let nuevoProyecto = new Proyecto(nombreProyecto);
    listaProyectos.push(nuevoProyecto);
    borrarDivNuevoProyecto();
    mostrarProyectos(listaProyectos);
}

function borrarDivNuevoProyecto() {
    document.getElementById("nuevoProyecto").innerHTML = "";
}