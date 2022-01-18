const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    // recibe los parametros por query y destructurarlo { se especifica cada cosa que se quiere destructurar}
    const {q, nombre = 'No Name', apikey, page = 10, limit = 50} = req.query;


    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPut = (req, res) => {

    const {id, nombre} = req.params;

    res.status(500).json({
        msg: 'put API - controlador',
        id, nombre
    })
}

const usuariosPost = (req, res = response) => {
    // const body = req.body;
    // Destructurar Body
    const {nombre, edad, id, apellido} = req.body;

    
    res.status(201).json({
        
       msg: 'post API - controlador',
        nombre, edad, id, apellido
        
    })
    
    
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
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




