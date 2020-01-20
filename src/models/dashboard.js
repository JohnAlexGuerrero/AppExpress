const conexion = require('../connection');

module.exports = {
    async insertar(nombre,telefono,email,direccion) {
        
        let resultados = await conexion.query('INSERT INTO cliente(nombre_clie,telefono,email,direccion) VALUES($1,$2,$3,$4);',
            [nombre,telefono,email,direccion]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query('SELECT COUNT(IDPRODUCTO) as productos FROM PRODUCTOS;');
        console.log(resultados.rows)
        return resultados.rows[0]; 
    },

    async obtenerPorId(id) {
        const resultados = await conexion.query(`select * from carrito where idsubcategoria = $1`, [id]);
        return resultados.rows[0];
    },

    async actualizar(nombre) {
        const resultados = conexion.query('update categoria',
            'set nombre = $1,',
            'where idsubcategoria = $2', [nombre, id]);
        return resultados;
    },

}