const express = require('express');
const router = express.Router();

const ventasModel = require('../models/ventas');

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
    const {idproducto,fecha,cantidad,venta,total,costo} = req.body;
    let ganancia = total - (cantidad*costo);

    ventasModel.insertar(idproducto,fecha,cantidad,venta,total,ganancia)
    .then(factura =>{
        res.redirect('/productos');
    })
    .catch(err =>{
        return res.status(500).send('Error insertado FACTURA ');
    });
});

module.exports = router;