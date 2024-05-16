const pad = document.querySelector(".middle");
//variable que aloja a es doc de estilos css style
const stylesheet = document.styleSheets[0];
const arrayMultiplos = [];
let mouseArriba = true;
const botonGrid = document.querySelector('.grid-button');
const botonFunciones = document.querySelector('.functions-button');
const numeroPrueba = 16;
//constantes de Colores para el array
const arrayColores= ["0, 0, 0","128, 128, 128","192, 192, 192","255, 255, 255",
"255, 0, 0","128, 0, 0","255, 255, 0","128, 128, 0",
"0, 255, 0","0, 128, 0","0, 255, 255","0, 128, 128",
"0, 0, 255","0, 0, 128","255, 0, 255","128, 0, 128"
];


//genera un numero al azar entre el lenght del array
function generateRandom(){
  const random = arrayColores[Math.floor(Math.random()* arrayColores.length)]
  return random
}

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
      event.target.style.backgroundColor = `rgb(${arrayColores[0]})`
      event.target.style.opacity = "1";
      break;
      case "colores":
        let colorRandom = generateRandom();
        event.target.style.backgroundColor = `rgb(${colorRandom})`
        event.target.style.opacity = "1";

        break;
      case "tonos": 

      //obtenemos el color del fondo y sacamos el Alpha
      let opacidad = event.target.style.opacity;
      console.log(opacidad)

      //si tiene alfa, se activa la funcion para ir agregando mas poco a poco
      if(opacidad >= 0.1 && opacidad < 1.0){
        opacidad = +opacidad + 0.1;
        event.target.style.opacity = `${opacidad}`;

      }else{
        //si no tenia alfa, se le asigna uno y la proxima vez ya tendra alpha
        event.target.style.opacity = "0.1";
        event.target.style.backgroundColor = `rgb(${arrayColores[0]})`
      }

      break;
     }
}
})

//evento en boton, para insertar cuadricula
botonGrid.addEventListener('click', () => {
  const seleccionUsuario = Number(prompt('Ingrese en cuanto quiere dividir el area'))
  console.log(seleccionUsuario)
  if(seleccionUsuario > 100  || seleccionUsuario <= 0 || Number.isNaN(seleccionUsuario)){
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