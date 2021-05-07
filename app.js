const express = require("express"); //importa a lib express
const app = express(); // inicia a lib
const { Client } = require('pg'); // criando uma comunicação com o postgres
const dotenv = require('dotenv'); // habilitando a utilização do dotenv
require('dotenv').config();


const client = new Client({
    host: process.env.HOST,
    user:process.env.DB_USER,
    password:process.env.PASSWORD,
    port:process.env.PORT,
    database:process.env.DATABASE,
})
client.connect();


app.use(express.json());

app.get('/', async (req, res) => {
    const result = await client.query('SELECT id,nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa FROM cliente;');
    return res.send(result);
});

 app.get('/:id', async (req, res) => {
     const idCliente = req.params.id;
     const result = await client.query('SELECT id,nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa FROM cliente WHERE id = $1;', [idCliente]);
     return res.send(result);
 });

 app.post ('/', (req,res) => {
     const postMessage = "Succesfully post";
    const { nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado} = req.body;
    if(cpf_cnpj.length == 11){
        cadastro_pessoa = "Pessoa física";
        client.query(`INSERT INTO cliente (nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa]);
    }
    else if(cpf_cnpj.length == 14){
        cadastro_pessoa = "Pessoa jurídica";
        client.query(`INSERT INTO cliente (nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa]);
    }
    else{
        return res.status(400).send("CPF ou CNPJ inválido!");
    }
    return res.send(postMessage);
 });

 app.put('/:id', (req,res) => {
    const putMessage = "Successfully put";
    const id = req.params.id;
    const {nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado} = req.body;
    if(cpf_cnpj.length == 11){
        cadastro_pessoa = "Pessoa física";
        client.query(`UPDATE cliente SET nome=$1,email=$2,cpf_cnpj=$3,telefone=$4,cep=$5,logradouro=$6,numero=$7,bairro=$8,cidade=$9,estado=$10,cadastro_pessoa=$11 WHERE id = $12`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa,id]);
    }
    else if(cpf_cnpj.length == 14){
        cadastro_pessoa = "Pessoa jurídica";
        client.query(`UPDATE cliente SET nome=$1,email=$2,cpf_cnpj=$3,telefone=$4,cep=$5,logradouro=$6,numero=$7,bairro=$8,cidade=$9,estado=$10,cadastro_pessoa=$11 WHERE id = $12`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa,id]);
    }
    else{
        return res.status(400).send("CPF ou CNPJ inválido!");
    }
    return res.send(putMessage);
 });

app.delete('/:id', (req,res) => {
    const deleteMessage = "Successfully delete";
    const id = req.params.id;
    client.query(`DELETE FROM cliente WHERE id = $1`, [id]);
    return res.send(deleteMessage);
});

const port = 3002;

app.listen(port, () => { // indicar a porta que será usada do pc
    console.log('server running');
});