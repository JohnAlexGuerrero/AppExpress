const conexion = require('../models/connection');

module.exports = {
    async insertar(nombre, precio) {
        let resultados = await conexion.query('insert into productos(nombre, precio) values ($1, $2)',
            [nombre, precio]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query('select idproductos,nombre,precio',
            'stock,idcategoria from productos where idproductos = $1', [idproductos]);
        return resultados[0];
    },

    async actualizar(idproductos, nombre, precio) {
        const resultados = conexion.query('update productos',
            'set nombre = $1,',
            'precio = $2',
            'where idproductos = $3', [nombre, precio, id]);
        return resultados;
    },

    async eliminar(idproductos) {
        const resultados = conexion.query('delete from productos where idproductos = $1', [idproductos]);
        return resultados;
    },
}
