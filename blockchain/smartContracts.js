
class RegistroAspirantesUGSmartContract {
      
      apply(transaction, blocks) {

      	blocks.forEach(function(block){

      		block.transactions.forEach(function(trans){
      			
      			if (transaction.cedula == trans.cedula) {

					console.log("Bloque Minado")
      				transaction.notaSenescyt = 750 

      				if (transaction.notaSenescyt > 750){

      					transaction.noCumpleRequisitos = "Aprobado"
      				}
      			}
      	})
      })

  }
}

module.exports = RegistroAspirantesUGSmartContract