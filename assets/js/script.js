
const URL = "https://digimon-api.vercel.app/api/digimon"

// Mostrar tabla:
$('#idLista').on('click', async () => {
  $('#idTabla').toggleClass('d-none', 'd-block');
  await crearTabla();
});


let inputDigiName = document.getElementById('input_digimon')

$('#boton').on('click', () => {
  mostrarDigimon(inputDigiName.value)
})

// function prueba(nombre) {
//   this.nombre = nombre
//   console.log('console.log dentro de fncion prueba = ',this.nombre, nombre)
// }
// prueba('auka')
// console.log('nombre = ', nombre)
// console.log('window.nombre =', window.nombre)

// nombre = 'car'
// console.log('window.nombre =', window.nombre)

// const pr = new prueba('ly');
// console.log(nombre)

// console.log('pr.nombre = ', pr.nombre)
// console.log('nombre = ', nombre)
// console.log('window.nombre =', window.nombre)
// console.log(pr)
// function nueva(nombre){
//   this.nombre=nombre
// }
// nueva('carlos')
// console.log('window.nombre =', window.nombre)
// prueba('jose')
// console.log(nombre)

// prueba('pepino')
// console.log(nombre)
// nueva('ergio')

async function obtenerDatos() {
  const response = await fetch(URL)
  return response.json()
}

function mostrarDigimon(digimon) {
  obtenerDatos()
    .then((data) => data.filter((item) => item.name.toLowerCase() === digimon.toLowerCase()))
    .then(data => {
      idNombreCard.innerText = `Nombre: ${data[0].name}`
      idNivelCard.innerText = `Nivel: ${data[0].level}`
      idImagenCard.setAttribute('src', data[0].img)
    })
  // .then((data) => console.log(data[0].name.toLowerCase()))
}

function sugerirDigimon() {
  obtenerDatos()
    .then((datos) => {
      let listaDigimon = document.getElementById("idListaDigimon");
      for (let objetoDigimon of datos) { //----->obtengo los objetos que estan dentro del array datos y los itero en la constante objetoDigimon

        let nombreListaDigimon = document.createElement('option');
        nombreListaDigimon.value = objetoDigimon.name;
        listaDigimon.appendChild(nombreListaDigimon);
      }
    })
}
sugerirDigimon()

let estadoFilas = 'no creadas';

function crearTabla() {
  obtenerDatos()
    .then(datos => {
      let contador = 0;
      if (estadoFilas == 'no creadas') {
        crearFilas(datos, contador)
      }
      estadoFilas = 'creadas'
    })
}

function crearFilas(datos, contador) {
  let filas = '';
  for (i = contador; i < contador + 11; i++) {
    filas += `
              <tr>
                <td class="col">${datos[i].name}</td>
                <td>${datos[i].level}</td>
                <td><img src="${datos[i].img}" width="30%"></td>
              </tr>
        `
  }
  tbody.innerHTML = filas;
  if(estadoFilas == 'creadas'){
    tbody.innerHTML += `
                        <div class="container">
                          <button class="btn btn-warning d-inline m-1" id="btnAnt">Anterior</button>
                          <button class="btn btn-warning d-inline m-1" id="btnSig">Siguiente</button>
                        </div>
                       `    
  }else{
    tbody.innerHTML += `
    <div class="container">
      <button class="btn btn-warning d-inline m-1" id="btnSig">Siguiente</button>
    </div>
      `
  }

  btnSig.addEventListener('click', () => {
    contador += 11
    crearFilas(datos, contador)
    console.log(contador)
  })

  btnAnt.addEventListener('click', () => {
    contador -= 11
    crearFilas(datos, contador)
  })
  
  let tr = document.getElementsByTagName('tr')
  for (const iterator of tr) { //con este ciclo for agrego a cada elemento <tr> un eventlistener para que al hacer click en cualquier de estos elementos lo muestro en el card principal.
    iterator.addEventListener('click', () => {
      mostrarDigimon(iterator.firstElementChild.textContent)
      idImagenCard.scrollIntoView({ block: 'end' })
    }
    )
  }

}
