const express = require('express');
const router = express.Router();

const clientesModel = require('../models/clientes');

router.get('/',function (req,res,next){
    ventasModel.obtener().then(clientes =>{
        res.render('ventas/ver',{
            clientes : clientes,
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).send('Error obteniendo productos (here)');
    });
});

router.post('/ingresar',(req,res,next)=>{
    const {nombre,telefono,email,direccion} = req.body;
    console.log(nombre)

    clientesModel.insertar(nombre,telefono,email,direccion)
    .then(cliente =>{
        res.redirect('/ventas/');
    })
    .catch(err =>{
        return res.status(500).send('Error insertado FACTURA ');
    });
});

module.exports = router;