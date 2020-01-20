const conexion = require('../connection');

module.exports = {
    async insertar(empresa,contacto,telefono) {
        
        let resultados = await conexion.query('INSERT INTO proveedores(empresa,contacto,telefono) VALUES($1,$2,$3);',
            [empresa,contacto,telefono]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query('SELECT * FROM proveedores left join productos on idproveedor=idpvd ORDER BY empresa;');
        return resultados.rows; 
    },

    async obtenerPorId(id) {
        const resultados = await conexion.query(`select * from proveedores where idproveedor = $1`, [id]);
        return resultados.rows[0];
    },

    async actualizar(nombre) {
        const resultados = conexion.query('update proveedores',
            'set nombre = $1,',
            'where idsubcategoria = $2', [empresa, id]);
        return resultados;
    },

}