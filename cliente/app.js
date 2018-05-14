
let btnSearch = document.getElementById("btnSearch")
let estudiantesRegistrosList = document.getElementById("estudiantes-registros")
let cedulaTextBox = document.getElementById("cedulaTextBox")


btnSearch.addEventListener('click',function(){

  estudiantesRegistrosList.innerHTML = ''

   let cedula = cedulaTextBox.value
   let url = "http://localhost:3000/estudiantes-registros/" + cedula

   fetch(url)
   .then(r => r.json())
   .then(estudiantesRegistros => {

      estudiantesRegistros.map(record => {

          let item = document.createElement("li")
          let divItem = document.createElement("div")

          let notaSenescytLabel = document.createElement("label")
          let notaIngresoLabel = document.createElement("label")
          let carreraLabel = document.createElement("label")
          let noCumpleRequisitosLabel = document.createElement("label")


		  notaSenescytLabel.innerHTML = "Notas: " + record.notaSenescyt
          notaIngresoLabel.innerHTML = "Notas: " + record.notaIngreso.toString()
          carreraLabel.innerHTML = "Carrera: " + record.carrera
          noCumpleRequisitosLabel.innerHTML = "De acuerdo a sus notas usted esta: " + record.noCumpleRequisitos.toString()


          divItem.appendChild(notaSenescytLabel)
          divItem.appendChild(notaIngresoLabel)
          divItem.appendChild(carreraLabel)
          divItem.appendChild(noCumpleRequisitosLabel)

          item.appendChild(divItem)

          estudiantesRegistrosList.appendChild(item)

      })

   })

})
