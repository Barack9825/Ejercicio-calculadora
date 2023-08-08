const simbolos = [
  "C",
  "%",
  "()",
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
    clase += 'simbolo '
    if ((Number(simbolo) + 1) % 4 == 0 && caracter !== '=') { clase += 'operador' }
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

const Agregar = (boton) => {
  if (valor.innerHTML === '0') {
    valor.innerHTML = boton.innerHTML
  } else if (boton.classList.contains('numero')) {
    valor.innerHTML += boton.innerHTML
  } else if (boton.classList.contains('operador') && !validarEntrada('operador')) {
    valor.innerHTML += boton.innerHTML
  }else if(boton.id='%' && !validarEntrada('numero')){
    valor.innerHTML += boton.innerHTML
  }
}

const botonera = document.getElementsByClassName('boton')


for (const boton of botonera) {
  boton.addEventListener('click', () => {
    Agregar(boton)
  })
}

