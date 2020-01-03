const conexion = require('../connection');

module.exports = {
    async insertar(idproducto,fecha,cantidad,venta,total,ganancia) {
        
        let resultados = await conexion.query('INSERT INTO ventas(idproducto,fecha,cantidad,precio,total,ganancia) VALUES($1,$2,$3,$4,$5,$6);',
            [idproducto,fecha,cantidad,venta,total,ganancia]);
        return resultados;
    },

    async obtener() {
        const resultados = await conexion.query('SELECT ID_CLIE,NOMBRE_CLIE FROM cliente ORDER BY NOMBRE_CLIE;');
        
        return resultados.rows; 
    },

    async obtenerPorId(id) {
        const resultados = await conexion.query(`select * from carrito where idsubcategoria = $1`, [id]);
        return resultados.rows[0];
    },

    async actualizar(idproducto) {
        resultados = await conexion.query('UPDATE PRODUCTOS SET STOCK = (',
        'SELECT (STOCK-CANTIDAD)AS STOCK FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS WHERE IDPRODUCTOS = $1)',
        'where idproductos=IDPRODUCTO;',[idproducto]);
        return resultados;
    },

}

