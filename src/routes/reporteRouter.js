const express = require('express');
const router = express.Router();

const reporteModel = require('../models/reportes');

router.get('/compras', function (req, res, next) {
    reporteModel.obtener().then(compras => {
        res.render('reportes/compras', {
            compras: compras,
        });
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send('Error obteniendo productos (here)');
        });
});

router.get('/gastos', function (req, res, next) {
    reporteModel.obtener_g().then(gastos => {
        res.render('reportes/gastos', {
            gastos: gastos,
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

router.post('/compras/ingresar', (req, res, next) => {
    const { fecha,factura,descripcion,valor } = req.body;

    reporteModel.insertar(fecha,factura,descripcion,valor)
        .then(idproductoInsertado => {
            res.redirect('/reportes/compras');
        })
        .catch(err => {
            return res.status(500).send('Error insertado producto');
        });
});

router.post('/gastos/ingresar', (req, res, next) => {
    const { fecha,descripcion,valor } = req.body;

    reporteModel.insertar_g(fecha,descripcion,valor)
        .then(idproductoInsertado => {
            res.redirect('/reportes/gastos');
        })
        .catch(err => {
            return res.status(500).send('Error insertado producto');
        });
});

router.get('/eliminar/:idproductos', (req, res, next) => {
    reporteModel.obtenerPorId(req.params.idproductos)
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
    reporteModel.obtenerPorId(req.params.idproductos)
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
    reporteModel.obtenerPorId(req.params.idproductos)
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
    reporteModel.obtenerPorId(req.params.idproductos)
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

    reporteModel.addcar(idproducto, fecha, cantidad, venta, total)
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
    reporteModel.actualizar(id, cantidad, costo)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});

module.exports = router;