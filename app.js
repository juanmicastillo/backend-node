require('dotenv').config();

const { usuariosPost } = require('./controllers/usuarios');
const Server = require('./models/server');

const server = new Server();

server.listen();

