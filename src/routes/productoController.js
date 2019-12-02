const express = require('express');
const router = express.Router();

const productosModel = require('../models/productos');

router.get('/',function (req,res,next){
    productosModel.obtener().then(productos =>{
        res.render('productos/ver',{
            productos : productos,
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).send('Error obteniendo productos (here)');
    });
});

router.get('/agregar',(req,res,next)=>{
    res.render('productos/agregar');
});

router.post('/insertar',(req,res,next)=>{
    const {nombre} = req.body;

    productosModel.insertar(nombre)
    .then(idproductoInsertado =>{
        res.redirect('/productos');
    })
    .catch(err =>{
        return res.status(500).send('Error insertado producto');
    });
});

router.get('/eliminar/:idproductos',(req,res,next)=>{
    productosModel.obtenerPorId(req.params.idproductos)
    .then(producto =>{
        if(producto){
            res.render('productos/editar',{
                producto: producto,
            });
        }else{
            return res.status(500).send('No existe producto con ese id');
        }
    })
    .catch(err =>{
        return res.status(500).send('Error obtenido producto');
    });
});

router.get('/inventario/:idproductos',(req,res,next)=>{
    productosModel.obtenerPorId(req.params.idproductos)
    .then(producto =>{
        if(producto){
            res.render('productos/inventario',{
                producto: producto,
            });
        }else{
            return res.status(500).send('No existe producto con ese id');
        }
    })
    .catch(err =>{
        return res.status(500).send('Error obtenido producto');
    });
});

router.get('/editar/:idproductos',(req,res,next)=>{
    productosModel.obtenerPorId(req.params.idproductos)
    .then(producto => {
        if(producto){
            res.render('productos/editar',{
                producto:producto,
            });
        }else{
            return res.status(500).send('No existe producto con ese id');
        }
    })
    .catch(err=>{
        return res.status(500).send('Error obteniendo producto you is here');
    });
});

router.post('/item', (req,res,next)=>{
    const { id,codigo,marca,color,und,cantidad,costo, precio } = req.body;
    
    if(!id | !codigo ){
        return res.status(500).send('No hay sufucientes datos');
    }

    productosModel.addinventario(id,codigo,marca,color,und,cantidad,costo, precio)
    .then(idproductoInser =>{
        res.redirect('/productos');
    })
    .catch(err => {
        return res.status(500).send('Error Actualizando producto');
    });

        
    
});


module.exports = router;