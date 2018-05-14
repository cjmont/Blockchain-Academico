
let Block = require('./block')
let Blockchain = require('./blockchain')
let BlockchainNode = require('./BlockchainNode')
let Transaction = require('./transaction')
let sha256 = require('js-sha256')
let RegistroAspirantesUGSmartContract = require('./smartContracts')

let fetch = require('node-fetch')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = 3000

// access the arguments
process.argv.forEach(function(val,index,array){
  port = array[2]
})

if(port == undefined) {
  port = 3000
}

let transactions = []
let nodes = []
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json())

app.get('/resolve',function(req,res){

  nodes.forEach(function(node){

      fetch(node.url + '/blockchain')
      .then(function(response){
        return response.json()
      })
      .then(function(otherNodeBlockchain){

          if(blockchain.blocks.length < otherNodeBlockchain.blocks.length) {
            blockchain = otherNodeBlockchain
          }

          res.send(blockchain)

      })

  })

})

app.post('/nodes/register',function(req,res){

  let nodesLists = req.body.urls
  nodesLists.forEach(function(nodeDictionary){
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(node)
  })

  res.json(nodes)

})

app.get('/nodes',function(req,res){
  res.json(nodes)
})

app.get('/',function(req,res){
  res.send("hello world")
})

app.get('/mine',function(req,res){

    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    transactions = []
    console.log(transactions)
    res.json(block)
})


///ug.edu.ec/estudiantes-registros/0920484524
///ug.edu.ec/estudiantes-registros/1003484092
app.get("/estudiantes-registros/:cedula",function(req,res){

  let cedula = sha256(req.params.cedula)

  let transactions = blockchain.transactionsByCedula(cedula)

  res.json(transactions)
})


/////Para generar las transacciones
app.post('/transactions',function(req,res){

  console.log(transactions)

  let registroAspirantesUGSmartContract = new RegistroAspirantesUGSmartContract()

  let cedula = sha256(req.body.cedula)
  let fecha = req.body.fecha
  let carrera = req.body.carrera
  let notaSenescyt = req.body.notaSenescyt


  let transaction = new Transaction(cedula,fecha,carrera,notaSenescyt)
 

////////Llamo al contrato inteligente que es el que une la blockchain con las transacciones
  registroAspirantesUGSmartContract.apply(transaction, blockchain.blocks)

  transactions.push(transaction)


  res.json(transactions)

})

app.get('/blockchain',function(req,res){

  res.json(blockchain)

})

app.listen(port,function(){
  console.log("Blockchain ejecutandose...")
})
