const { readFile } = require('fs');
const transport = require('../mail')

const handlebars = require('handlebars');
const compiladorHtml = require('../utils/compiladorhtml');

const usuario = {
    nome: 'Petra',
    email: 'petrahortelanazevedo@gmail.com',
    senha: '123abc'
}

const login = async (req,res) => {
const {email, senha} = req.body;

if (usuario.email != email) {
    return res.status(400).json({mensagem: "E-mail ou senha inválidos"});
};
if (usuario.senha != senha) {
    return res.status(400).json({mensagem: "E-mail ou senha inválidos"});
}
 
const html = await compiladorHtml('./src/templates/login.html', {nomeusuario: usuario.nome})

transport.sendMail({
from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
to: `${usuario.nome} <${usuario.email}>`,
subject: "Tentativa de login - Verificação de integração",
html,
})

return res.json({mensagem: 'Login efetuado com sucesso.'})
}

module.exports = login;