const conexion = require('../connection');

module.exports = {
    async insertar(fecha,factura,descripcion,valor) {
        let resultados = await conexion.query('INSERT INTO compras_pagos(fecha,factura,description,valor) VALUES($1,$2,$3,$4);',
            [fecha,factura,descripcion,valor]);
        return resultados;
    },

    async insertar_g(fecha,descripcion,valor) {
        let resultados = await conexion.query('INSERT INTO gastos(fecha,description,valor) VALUES($1,$2,$3);',
            [fecha,descripcion,valor]);
        return resultados;
    },

    async obtener_g() {
        const resultados = await conexion.query(
            'SELECT * FROM gastos ORDER BY fecha;');
        return resultados.rows; 
    },

    async obtener() {
        const resultados = await conexion.query(
            'SELECT * FROM compras_pagos ORDER BY fecha;');
        return resultados.rows; 
    },

    async obtenerPorId(idproductos) {
        const resultados = await conexion.query(`SELECT * FROM productos where idproductos = $1`, [idproductos]);
        return resultados.rows[0];
    },

    async addinventario(id,codigo,marca,color,und,cantidad,costo, precio) {
        let resultados = await conexion.query('INSERT INTO inventario(idproducto,codigo,marca,color,idund,stock,pcosto,pventa)',
            'values ($1,$2,$3,$4,$5,$6,$7,$8)',
            [id,codigo,marca,color,und,cantidad,costo, precio]);
        return resultados;
    },

    async eliminar(idproductos) {
        const resultados = conexion.query('delete from productos where idproductos = $1', [idproductos]);
        return resultados;
    },

    async addcar(idproductos,fecha,cantidad,venta,total) {
        alert('codigo: ',idproductos)
        let resultados_2 = await conexion.query('INSERT INTO ventas(idproducto,datecreated,cantidad,pventa,total) VALUES($1,$2,$3,$4,$5);',
            [idproductos,fecha,cantidad,venta,total]);
        return resultados_2;
    },

    async actualizar(id, cantidad, costo) {
        const resultados = conexion.query(`update productos
        set stock = $1,
        pcosto = $2
        where idproductos = $3`, [cantidad, costo, id]);
        return resultados;
    },
}
