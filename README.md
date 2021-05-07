# Projeto Node: Cadastro de clientes
## Descrição:
Esta é uma API Rest que realiza o cadastro de um cliente, a atulização dele, a sua deleção e a busca das informações do cadastro. Os dados contidos no cadastro são id, nome, email, cpf/cnpj, telefone, cep, logradouro, número, bairro, cidade, estado e tipo de cadastro da pessoa(CPF ou CNPJ). Na criação e na atualização do cadastro são feitas verificações da quantidade de caracteres presente no campo "cpf_cnpj" então, se a quantidade de caracteres for igual a 11, esse cadastro é preenchido como uma pessoa física, se for igual a 14, é preenchido como uma pessoa jurídica e, se não for nenhum dos dois, será retornado o status 400 na requisição e a mensagem "CPF ou CNPJ inválido!".

## Como utilizar:
Foi feita a comunicação com o banco de dados postgres, então se o usuário quiser usar o mesmo banco, basta trocar os dados password,port e database no arquivo .env. Utilizei o insomnia para fazer as requisições e, para isso, bastar usar os métodos GET, POST, PUT, DELETE que o programa fornece para conseguir utilizar cada uma das funções dessa API. 
## Linguagem utilizada:
JavaScript
## Plataforma utilizada:
Node.js
