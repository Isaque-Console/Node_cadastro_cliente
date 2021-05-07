const express = require("express"); //importa a lib express
const app = express(); // inicia a lib
const { Client } = require('pg'); // criando uma comunicação com o postgres
const dotenv = require('dotenv'); // habilitando a utilização do dotenv
require('dotenv').config();

//dados para se comunicar com o postgres
const client = new Client({
    host: process.env.HOST,
    user:process.env.DB_USER,
    password:process.env.PASSWORD,
    port:process.env.PORT,
    database:process.env.DATABASE,
})
client.connect();


app.use(express.json());

//busca os dados de todos os clientes
app.get('/', async (req, res) => {
    const result = await client.query('SELECT id,nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa FROM cliente;');
    return res.send(result);
});

//busca os dados de um cliente apenas
 app.get('/:id', async (req, res) => {
     const idCliente = req.params.id;
     const result = await client.query('SELECT id,nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa FROM cliente WHERE id = $1;', [idCliente]);
     return res.send(result);
 });

//salva um novo cadastro de cliente
 app.post ('/', (req,res) => {
    const postMessage = "Succesfully post";
    let cadastro_pessoa;
    const { nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado} = req.body;
    if(cpf_cnpj.length == 11){
        cadastro_pessoa = "Pessoa física";
    }
    else if(cpf_cnpj.length == 14){
        cadastro_pessoa = "Pessoa jurídica";
    }
    else{
        return res.status(400).send("CPF ou CNPJ inválido!");
    }
    client.query(`INSERT INTO cliente (nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa]);
    return res.send(postMessage);
 });

//atualiza o cadastro de um cliente
 app.put('/:id', (req,res) => {
    const putMessage = "Successfully put";
    let cadastro_pessoa;
    const id = req.params.id;
    const {nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado} = req.body;
    if(cpf_cnpj.length == 11){
        cadastro_pessoa = "Pessoa física";
    }
    else if(cpf_cnpj.length == 14){
        cadastro_pessoa = "Pessoa jurídica";
    }
    else{
        return res.status(400).send("CPF ou CNPJ inválido!");
    }
    client.query(`UPDATE cliente SET nome=$1,email=$2,cpf_cnpj=$3,telefone=$4,cep=$5,logradouro=$6,numero=$7,bairro=$8,cidade=$9,estado=$10,cadastro_pessoa=$11 WHERE id = $12`, [nome,email,cpf_cnpj,telefone,cep,logradouro,numero,bairro,cidade,estado,cadastro_pessoa,id]);
    return res.send(putMessage);
 });

//deleta o cadastro de um cliente
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