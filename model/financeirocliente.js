//importação do mongoose para realizar a persistencia com mongodb
const mongoose = require("mongoose");
//Criação do esquema de dados da tabela. Campos da tabela
const tabela = new mongoose.Schema({
    nome_banco:{type:String},
    tipo_conta:{type:String},
    nome_titular:{type:String},
    limite_cartao:{type:String},
    token:String
})
//construção de tabela com o comando model
module.exports = mongoose.model('tbcliente',tabela);