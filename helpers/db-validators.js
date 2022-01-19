const Role = require('../models/role');

const Usuario = require('../models/usuario');

const esRoleValido = async (rol = ' ') => {
     // Role proviene de la colección role previamente schema
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async (correo = ' ') => {
     // Usuario es de la coleccion Usuario previamente schema
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El Correo ${ correo } ya está registrado`);
    } 
}


const existeUsuarioPorID = async (id) => {
    // Usuario es de la coleccion Usuario previamente schema
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id} `);
    }
};
    
 

module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorID
}