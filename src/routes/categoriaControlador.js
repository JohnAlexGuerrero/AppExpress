const express = require('express');
const router = express.Router();

const productosModel = require('../models/categoria');

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

router.get('/add',(req,res,next)=>{
    res.render('categorias/adds');
});

router.post('/insertar',(req,res,next)=>{
    const {nombre, precio} = req.body;

    if(!nombre || !precio){
        return res.status(500).send('No hay nombre o precio');
    }

    productosModel.insertar(nombre, precio)
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

router.post('/actualizar/', (req,res,next)=>{
    const { idproductos, nombre, precio } = req.body;
    if(!nombre || !precio || !idproductos){
        return res.status(500).send('No hay sufucientes datos');
    }

    productosModel.actualizar(idproductos,nombre,precio)
    .then( () =>{
        res.redirect('/productos');
    })
    .catch(err => {
        return res.status(500).send('Error Actualizando producto');
    });

        
    
});

module.exports = router;