const express = require('express');
const router = express.Router();

const productosModel = require('../models/productos');

router.get('/', function (req, res, next) {
    productosModel.obtener().then(productos => {
        res.render('productos/ver', {
            productos: productos,
        });
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send('Error obteniendo productos (here)');
        });
});

router.get('/agregar', (req, res, next) => {
    res.render('productos/agregar');
});

router.post('/insertar', (req, res, next) => {
    const { nombre, cantidad, und, costo,precio,proveedor } = req.body;

    productosModel.insertar(nombre, cantidad, und, costo,precio,proveedor)
        .then(idproductoInsertado => {
            res.redirect('/productos');
        })
        .catch(err => {
            return res.status(500).send('Error insertado producto');
        });
});

router.get('/eliminar/:idproductos', (req, res, next) => {
    productosModel.obtenerPorId(req.params.idproductos)
        .then(producto => {
            if (producto) {
                res.render('productos/editar', {
                    producto: producto,
                });
            } else {
                return res.status(500).send('No existe producto con ese id');
            }
        })
        .catch(err => {
            return res.status(500).send('Error obtenido producto');
        });
});

router.get('/inventario/:idproductos', (req, res, next) => {
    productosModel.obtenerPorId(req.params.idproductos)
        .then(producto => {
            if (producto) {
                res.render('productos/inventario', {
                    producto: producto,
                });
            } else {
                return res.status(500).send('No existe producto con ese id');
            }
        })
        .catch(err => {
            return res.status(500).send('Error obtenido producto');
        });
});

router.get('/editar/:idproductos', (req, res, next) => {
    productosModel.obtenerPorId(req.params.idproductos)
        .then(producto => {
            if (producto) {
                res.render('productos/editar', {
                    producto: producto,
                });
            } else {
                return res.status(500).send('No existe producto con ese id');
            }
        })
        .catch(err => {
            return res.status(500).send('Error obteniendo producto you is here');
        });
});

router.get('/cart/:idproductos', (req, res, next) => {
    productosModel.obtenerPorId(req.params.idproductos)
        .then(producto => {
            if (producto) {
                res.render('productos/cart', {
                    producto: producto,
                });
            } else {
                return res.status(500).send('No existe producto con ese id');
            }
        })
        .catch(err => {
            return res.status(500).send('Error obteniendo producto you is here');
        });
});


router.post('/venta', (req, res, next) => {
    const { idproducto, fecha, cantidad, venta, total } = req.body;

    productosModel.addcar(idproducto, fecha, cantidad, venta, total)
        .then(idprodInsertado => {
            res.redirect('/productos');
        })
        .catch(err => {
            return res.status(500).send('Error insertado venta');
        });
});

router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, cantidad, costo } = req.body;

    // Si todo va bien, seguimos
    productosModel.actualizar(id, cantidad, costo)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});

module.exports = router;