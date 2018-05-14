
class Transaction {
  constructor(cedula,fecha,carrera,notaSenescyt) {
    this.cedula = cedula
    this.fecha = fecha
    this.carrera = carrera
    this.notaSenescyt = notaSenescyt
    this.notaIngreso = 0
    this.noCumpleRequisitos = "Reprobado"
  }
}

module.exports = Transaction
