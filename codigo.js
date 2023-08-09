const simbolos = [
  "C",
  "%",
  "(",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "+/-",
  "0",
  ".",
  "=",
];


for (let i = 0; i <= 4; i++) {
  const fila = document.createElement('div')
  fila.id = `fila${i}`
  fila.className = 'row'
  document.getElementById('botonera').appendChild(fila)
}

for (let simbolo in simbolos) {

  let caracter = simbolos[simbolo]
  let clase = ''
  const boton = document.createElement("button");



  if (isNaN(caracter)) {
    clase += 'simbolo'
    if (((Number(simbolo) + 1) % 4 == 0 && caracter !== '=') || caracter == '%') { clase += (' ' + 'operador') }
  } else { clase += 'numero' }

  boton.id = caracter
  boton.className = `boton ${clase}`
  boton.innerHTML = caracter
  document.getElementById(`fila${Math.trunc(simbolo / 4)}`).appendChild(boton)
}

const valor = document.getElementById('valor')

const validarEntrada = (clase) => {
  const tipo = document.getElementsByClassName(clase)

  for (const operador of tipo) {
    if (valor.innerHTML.endsWith(operador.innerHTML)) {
      return true
    }
  }
  return false
}

const buscarSimbolo = () => {
  let cadena = valor.innerHTML
  while (!isNaN(cadena[cadena.length - 1])) {
    cadena = cadena.slice(0, cadena.length - 1)
  }
  return cadena
}

const validarPunto = () => {

  if (buscarSimbolo().endsWith('.')) {
    return false
  } else if (buscarSimbolo() == valor.innerHTML) {
    return false
  }
  else { return true }
}

const Resolver = () => {
  
  /* let resultado ={
    numero:0,
    operador:['+','-','*','/'],
    operando:0
  } */
}

const Agregar = (boton) => {

  if (valor.innerHTML === '0') {
    if (boton.classList.contains('numero')) {
      valor.innerHTML = boton.innerHTML
    }
  } else if (boton.classList.contains('numero')) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.classList.contains('operador') && !validarEntrada('simbolo')) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.id == 'C') {
    valor.innerHTML = '0'
  } else if (boton.id == '(' && validarEntrada('simbolo')) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.id == ')' && validarEntrada('numero')) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.id == '.' && validarPunto()) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.id == '+/-') {

    if (buscarSimbolo() !== '') { valor.innerHTML = valor.innerHTML.replace(buscarSimbolo(), buscarSimbolo() + '-') }
    else { valor.innerHTML = '-' + valor.innerHTML }
  }
  else if (boton.id == '=') {
    Resolver()
  }

}

const botonera = document.getElementsByClassName('boton')


for (const boton of botonera) {
  boton.addEventListener('click', () => {
    Agregar(boton)
  })
}
let par = true
const parentesis = document.getElementById('(')
parentesis.addEventListener('dblclick', () => {
  if (par) { parentesis.innerHTML = ')' }
  else { parentesis.innerHTML = '(' }
  par = !par
  parentesis.id = parentesis.innerHTML
})