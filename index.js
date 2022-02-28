// importação do modulo express para o node
const express = require("express");
const { application } = require("express");

//importação do modulo body-parser para realizar o trabalho com json que sera enviado pelo cliente
const bodyParser = require("body-parser");

//importação do mongoose para realizar a persistencia com mongodb
const mongoose = require("mongoose");

//importação do modulo do jsonwebtoken
const jwt = require('jsonwebtoken')

//importação do modulo local de configurações. aqui temos o caminho do banco de dados e do jwt
const settings = require("./config/settings")

//importação do modulo local com as configurações do modelo de dados de clientes
const cliente = require("./model/financeirocliente")

//importação do modulo do CORS para nossa aplicação
const cors = require("cors");

// utilizar o express na nossa aplicação
const app = express();

//utilizando o body-parser em nossa aplicação para realizar o parse para json
// de dados enviados pelo front a nossa aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuração do cors para aceitar a solitação de diversas origins e
//status code 200 para dispositivos antigos e smartv
const optionsConfig = {
    origin: "*",
    optionsSucessStatus:200
}

mongoose.connect(settings.dbpath,{useNewUrlParser:true,useUnifiedTopology:true});

app.post("/cadastro",cors(optionsConfig),(req,res)=>{
    const token = req.body.token
    const nome_banco = req.body.nome_banco
    const tipo_conta = req.body.tipo_conta
    const nome_titular = req.body.nome_titular
    const limite_cartao = req.body.limite_cartao
    var myquery = { token:token };
    var newvalues = { token:token, nome_banco:nome_banco, tipo_conta:tipo_conta, nome_titular:nome_titular, limite_cartao:limite_cartao };
    cliente.findOneAndUpdate(myquery, newvalues, function(err, dados){
        if(!dados) return res.send({erro:"Token invalido"})
        if (err) {
            res.status(400).send({erro:`Erro ao tentar cadastrar ${err}`});
            return
        }
        res.status(200).send({rs:"Dados financeiros cadastrados com sucesso!"});
      }); 
});

app.put("/atualizar",cors(optionsConfig),(req,res)=>{
    const token = req.body.token
    const nome_banco = req.body.nome_banco
    const tipo_conta = req.body.tipo_conta
    const nome_titular = req.body.nome_titular
    const limite_cartao = req.body.limite_cartao
    var myquery = { token:token };
    var newvalues = { token:token, nome_banco:nome_banco, tipo_conta:tipo_conta, nome_titular:nome_titular, limite_cartao:limite_cartao };
    cliente.findOneAndUpdate(myquery, newvalues, function(err, dados){
        if(!dados) return res.send({erro:"Token invalido"})
        if (err) {
            res.status(400).send({erro:`Erro ao tentar atualizar ${err}`});
            return
        }
        res.status(200).send({rs:"Dados financeiros atualizados com sucesso!"});
      }); 
});
app.listen(4000, () => console.log("Servidor online na porta 4000. Para encerrar tecle CTRL+C"));