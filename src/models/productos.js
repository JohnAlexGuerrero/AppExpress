const conexion = require('../connection');

module.exports = {
    async insertar(nombre) {
        let resultados = await conexion.query(`insert into productos(nombre) values ($1)`,
            [nombre]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query(
            'SELECT idproductos,nombre,stock,pcosto,nomund FROM productos JOIN unidad ON idund=idunidad;');
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
}
