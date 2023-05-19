
const BASE_URL = "https://digimon-api.vercel.app/api/digimon"

function obtenerDatos() {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(datos => {
         
            sugerirDigimon(datos)

         $('#idLista').on('click', ()=>{
            $('#idTabla').toggleClass('d-none', 'd-block')
             
            crearTabla(datos)
            
         })
            $("#idFormulario").submit(function (event) {
                event.preventDefault();
                let nombreDigimon = $("#input_digimon").val();

                for(let objetoDigimon of datos){
                    if (nombreDigimon.toLowerCase() == objetoDigimon.name.toLowerCase()) {
                        document.getElementById("idNombreCard").innerText = `Nombre: ${objetoDigimon.name}`
                        document.getElementById("idNivelCard").innerText = `Nivel: ${objetoDigimon.level}`
                        document.getElementById("idImagenCard").setAttribute("src", objetoDigimon.img)
                    }
                }
            })
            })
        }

obtenerDatos()

function sugerirDigimon(datos){
    let listaDigimon = document.getElementById("idListaDigimon");
    for (let objetoDigimon of datos) { //----->obtengo los objetos que estan dentro del array datos y los itero en la constante objetoDigimon

        let nombreListaDigimon = document.createElement('option');
        nombreListaDigimon.value = objetoDigimon.name;
        listaDigimon.appendChild(nombreListaDigimon);
    }
}

function crearTabla(datos){
    let tbody = document.getElementById("tbody");
    for(let objetoDigimon of datos){
        let filaDatosDigimon = document.createElement('tr');
        filaDatosDigimon.innerHTML = `
                                    <td class="col">${objetoDigimon.name}</td>
                                    <td>${objetoDigimon.level}</td>
                                    <td><img src="${objetoDigimon.img}" width="30%"></td>
                                    `
        tbody.appendChild(filaDatosDigimon);
    }
}
