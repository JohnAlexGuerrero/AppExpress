const conexion = require('../connection');

module.exports = {
    async insertar(nombre,codigo,und,stock,precio,description,pventa) {
        let resultados = await conexion.query(`insert into productos(nombre,codigo,idund,stock,preciocosto,descripcion,precio) values ($1, $2,$3,$4,$5,$6,$7)`,
            [nombre,codigo,und,stock,precio,description,pventa]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query(
            'SELECT * FROM productos JOIN unidad ON idunidad=idund;');
        return resultados.rows; 
    },

    async obtenerPorId(idproductos) {
        const resultados = await conexion.query(`select * from productos where idproductos = $1`, [idproductos]);
        return resultados.rows[0];
    },

    async actualizar(id, cantidad) {
        const resultados = conexion.query('update productos',
            'set stock = $1,',
            'where idproductos = $2', [cantidad, id]);
        return resultados;
    },

    async eliminar(idproductos) {
        const resultados = conexion.query('delete from productos where idproductos = $1', [idproductos]);
        return resultados;
    },
}
