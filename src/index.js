require('dotenv').config()
const express = require('express');
const knex = require("./conexao");
const login = require('./controladores/login');


const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
try {
const carros = await knex('carros')
return res.json(carros)
} catch (error) { 
    console.log(error)
return res.status(500).json({mensagem: "Erro do servidor"})
};
});

app.post('/login', login)

const port = process.env.PORT || 3000;

app.listen(port);