const pad = document.querySelector(".middle");
//variable que aloja a es doc de estilos css style
const stylesheet = document.styleSheets[0];
const arrayMultiplos = [];
let mouseArriba = true;
const botonGrid = document.querySelector('.grid-button');
const botonFunciones = document.querySelector('.functions-button');
const numeroPrueba = 16;


botonFunciones.addEventListener('click', ()=> {
  let funcionActiva = botonFunciones.id;
  //switch entre fucnciones, b&w, colores, tonos
  switch(funcionActiva){
    case "b&w":
      botonFunciones.id = "colores";
      break;
    case "colores":
      botonFunciones.id = "tonos";
      break;
    case "tonos": 
      botonFunciones.id = "b&w"
  }
})

//event listener de las funciones basado en el id del boton
pad.addEventListener("mouseover", (event) => {
  if(mouseArriba == true){
    switch(botonFunciones.id){
      case "b&w" : 
      event.target.style.backgroundColor = "black"
      break;
      case "colores":
        event.target.style.backgroundColor = "skyblue"
        break;
      case "tonos": 
      event.target.style.backgroundColor = "yellow"
      break;
    }
}
})

//evento en boton, para insertar cuadricula
botonGrid.addEventListener('click', () => {
  const seleccionUsuario = Number(prompt('Ingrese en cuanto quiere dividir el area'))
  if(seleccionUsuario > 100 || Number.isNaN(seleccionUsuario)){
    alert("Error, ingrese un dato valido, menor a 100 o en numeros")
  }else{
    cleanArrayMultiplos()
    cleanGrid()
    crearDivisiones(seleccionUsuario)
  }
})
//limpiar el grid de divs en una iteracion de hijos
function cleanGrid(){
  while(pad.firstChild){
    pad.firstChild.remove();
  }

}
//limpia el array de multiplos pasados
function cleanArrayMultiplos(){
  arrayMultiplos.length = 0;
}


//anadir multiplos de la seleccion a el arrayMultiplos
function multiplosSeleccionUsuario(seleccion){
for(let i = 1; i <= seleccion; i++){
  arrayMultiplos.push(i * seleccion)
}
}
//inserta a los estilos usados por las cuadriculas el tamano correcto
function insertarBasisCss(seleccion){
  const basisDivs = (1/seleccion)*100;
  stylesheet.cssRules[8].style.flexBasis = `${basisDivs}%`;
  stylesheet.cssRules[9].style.flexBasis = `${basisDivs}%`;

}
//event listener que cambia los colores

function onMouseDown(){
mouseArriba = false;
}
function onMouseUp(){
  mouseArriba = true;
}
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);


//funcion que genera la cuadricula

function crearDivisiones(seleccion){
  const numPruebaCuadrado = Math.pow(seleccion,2);
  multiplosSeleccionUsuario(seleccion);
  insertarBasisCss(seleccion);
  let numeroIds = 1;

  for(let i = 1; i <= seleccion; i++){
    let divContenedor = document.createElement("div");
    divContenedor.classList = "gridDiv";


    //anadir divs mas pequenos a su contenedor principal en fila
    //generando los cuadraditos
    for(numeroIds; numeroIds <= numPruebaCuadrado ; ++numeroIds){
      let divCuadricula = document.createElement("div");
      divCuadricula.classList = "childDivs";
      divCuadricula.id = `${numeroIds}`;
      divContenedor.appendChild(divCuadricula);


      //if para detener la iteracion con el numeroIds correcto y proseguir
      if(arrayMultiplos.indexOf(numeroIds) != -1){
        numeroIds++;
        break;
      }

    }
    pad.appendChild(divContenedor)
  }
}




crearDivisiones(numeroPrueba)