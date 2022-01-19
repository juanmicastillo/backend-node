const { response, request } = require('express');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async  (req = request, res = response) => {
    // recibe los parametros por query y destructurarlo { se especifica cada cosa que se quiere destructurar}
    // const {q, nombre = 'No Name', apikey, page = 10, limit = 50} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    
    // const total = await Usuario.countDocuments(query);

        // agrupar varios await para que se resuelvan simultaneamente 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ])
    res.json({
              
        total,
        usuarios
        
        // msg: 'get API - controlador',
        // q,
        // nombre,
        // apikey,
        // page, 
        // limit
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    if (password) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // 10 son el nivel de encriptación a mayor número más dificil y lento de gestionar / desencriptar 
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(
        // msg: 'put API - controlador',
        usuario
    );
}

const usuariosPost = async (req, res = response) => {

    // const { google, ...resto } = req.body;
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
 
    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync(10); // 10 son el nivel de encriptación a mayor número más dificil y lento de gestionar / desencriptar 
    usuario.password = bcryptjs.hashSync( password, salt )
    // Guardar en BD
    
    
    await usuario.save();
    // Destructurar Body
    // const body = req.body;

    
    res.json({
        usuario
    })
    // return res.status(200).json({
    //     usuario
           
    // })
    
    
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}




