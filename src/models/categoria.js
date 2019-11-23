const conexion = require('../connection');

module.exports = {
    async insertar(nombre) {
        let resultados = await conexion.query(`insert into categoria(nombre) values ($1)`,
            [nombre]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query('select * from categoria');
        return resultados.rows; 
    },

    async obtenerPorId(id) {
        const resultados = await conexion.query(`select * from categoria where idsubcategoria = $1`, [id]);
        return resultados.rows[0];
    },

    async actualizar(nombre) {
        const resultados = conexion.query('update categoria',
            'set nombre = $1,',
            'where idsubcategoria = $2', [nombre, id]);
        return resultados;
    },

}
