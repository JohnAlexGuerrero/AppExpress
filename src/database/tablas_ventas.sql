CREATE TABLE cliente(
id_clie SERIAL,
nombre_clie VARCHAR(40)NOT NULL DEFAULT 'Clientes Varios',
telefono VARCHAR(20) NOT NULL DEFAULT '111',
email VARCHAR(60),
direccion VARCHAR(30) DEFAULT 'xxx',
PRIMARY KEY(id_clie)

);

CREATE TABLE factura(
cod_factura SMALLINT NOT NULL,
idcliente SMALLINT,
fecha TIMESTAMP DEFAULT NOW(),
PRIMARY KEY(cod_factura)
);

CREATE TABLE ventas(
codfactura SERIAL,
idproducto SMALLINT NOT NULL,
fecha TIMESTAMP DEFAULT NOW(),
cantidad SMALLINT,
precio NUMERIC(10,2),
--iva NUMERIC(10,2) DEFAULT 0.00,
total NUMERIC(10,2),
ganancia NUMERIC(10,2),
PRIMARY KEY(codfactura,idproducto),
FOREIGN KEY(idproducto) REFERENCES productos(idproductos) ON  DELETE CASCADE
);

CREATE TABLE unidad(
idUnidad SERIAL,
nameUnidad VARCHAR(30)NOT NULL UNIQUE,
PRIMARY KEY(idUnidad)
);

CREATE TABLE productos(
idproducto SERIAL,
datemodified TIMESTAMP DEFAULT NOW(),
nombreProducto VARCHAR(60) NOT NULL UNIQUE,
stock SMALLINT DEFAULT 0,
idUnidad smallint not null,
costo NUMERIC(10,2) DEFAULT 0.00,
precio NUMERIC(10,2) DEFAULT 0.00,
image varchar(60),
idpvd smallint,
PRIMARY KEY(idproducto),
FOREIGN KEY(idUnidad) REFERENCES unidad(idUnidad),
FOREIGN KEY(idpvd) REFERENCES proveedores(idproveedor)
);


CREATE TABLE GASTOS(
idgasto SERIAL,
FECHA TIMESTAMP DEFAULT NOW(),
DESCRIPTION TEXT,
VALOR NUMERIC(10,2) DEFAULT 0.00,
PRIMARY KEY(idgasto)
);


CREATE TABLE COMPRAS_PAGOS(
idcompra SERIAL,
FECHA TIMESTAMP DEFAULT NOW(),
factura varchar(20) not null,
DESCRIPTION TEXT,
VALOR NUMERIC(10,2) DEFAULT 0.00,
PRIMARY KEY(idcompra)
);

create table proveedores(
idproveedor serial,
empresa varchar(60) not null,
contacto varchar(40)not null,
telefono varchar(40)not null,
primary key(idproveedor)
);

--CONTEO DE PRODUCTOS
SELECT COUNT(IDPRODUCTOS) as productos FROM PRODUCTOS
	
SELECT * FROM proveedores left join productos on idproveedor=idpvd
ORDER BY empresa;
--
SELECT FECHA,NOMBRE,CANTIDAD,PCOSTO,PRECIO,TOTAL,GANANCIA FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTOS=IDPRODUCTO


--LISTADO DE FACTURAS POR DIA
SELECT CODFACTURA,FECHA,SUM(TOTAL) FROM VENTAS WHERE FECHA = '2019-11-02' GROUP BY 1,2 ORDER BY 1

--DETALLE DE FACTURA
SELECT idproducto,NOMBRE,CANTIDAD,PRECIO,TOTAL
FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS WHERE CODFACTURA = '2290';


--TOTAL DE GANANCIAS POR DIA
SELECT nombre,pcosto,SUM(TOTAL-CANTIDAD*PCOSTO)AS VALOR
FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS
WHERE FECHA = '2019-11-02'
group by 1,2

------------------------------------
------------------------------------
------------------------------------

SELECT 'TOTAL GANANCIA' as  n,sum(cantidad*pcosto),SUM(TOTAL-CANTIDAD*PCOSTO)AS VALOR
FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS
WHERE FECHA = '2019-11-02'

--------RESUMEN DE GANACIA POR MES-------------
-----------------------------------------------

SELECT 'TOTAL' AS DIA,
'2020-12-01' AS DETALLE,
 SUM(t1.VENTAS)AS FACTURACION,
 SUM(t1.GANANCIA)AS UTILIDAD
FROM ( 

 SELECT 'diA',fecha,sum(total) as ventas,SUM(TOTAL-CANTIDAD*PCOSTO)AS ganancia
 FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS

 WHERE FECHA BETWEEN '2020-01-01' AND '2020-01-31'
 group by 2
 order by 2

)as t1

UNION


 SELECT 'diA',fecha,sum(total) as ventas,SUM(TOTAL-CANTIDAD*PCOSTO)AS ganancia
 FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS

 WHERE FECHA BETWEEN '2020-01-01' AND '2020-01-31'
 group by 2
 order by 2

-----------------------------------------------------
-----------------------------------------------------
-----------------------------------------------------

----------------------------------------------------
-----VENTA DE PRODUCTO POR MES----------------------
-----------------------------------------------------
SELECT FECHA,NOMBRE,PCOSTO,CANTIDAD,PRECIO,TOTAL,(TOTAL-CANTIDAD*PCOSTO) AS GANANCIA FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTOS=IDPRODUCTO
WHERE FECHA BETWEEN '2019-12-01' AND '2019-12-31' AND NOMBRE LIKE '%Alion%'

-------------------------------------------------
------------------------
--VALOR TOTAL DE VENTAS POR DIA
SELECT 'TOTAL VENTAS' AS DETALLE,fecha,SUM(TOTAL) FROM VENTAS
group by 2
 WHERE FECHA = '2019-11-02'

 
UNION 
--VALOR TOTAL DE COMPRAS Y PAGOS A PROVEEDORES
SELECT 'TOTAL PAGOS' AS DETALLE,SUM(VALOR) FROM COMPRAS_PAGOS WHERE FECHA = '2019-11-02'
UNION
--VALOR TOTAL DE GASTOS POR DIA
SELECT 'TOTAL GASTOS' AS DETALLE,SUM(VALOR) FROM GASTOS WHERE FECHA = '2019-11-02'


--LISTADO DE PRODUCTOS VENDIDOS POR DIA

SELECT NOMBRE,CANTIDAD,PCOSTO,PRECIO,TOTAL,SUM(TOTAL-CANTIDAD*PCOSTO)AS VALOR
FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS
WHERE FECHA = '2019-11-02'
GROUP BY 1,2,3,4,5

--actualizar stock de tabla de ventas y productos
SELECT NOMBRE,STOCK,CANTIDAD FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS

UPDATE PRODUCTOS SET
STOCK = (
SELECT (STOCK-CANTIDAD)AS STOCK FROM VENTAS JOIN PRODUCTOS ON IDPRODUCTO=IDPRODUCTOS WHERE IDPRODUCTOS = 1)
where idproductos=1

--funciones
CREATE FUNCTION myFuncion() RETURNS text AS
SELECT * FROM PRODUCTOS
LANGUAGE SQL;

--INSTALAR EL LENGUAJE plpgsql
create procedural language plpgsql;
--definimos funcion que sera usada por nuestro disparador
CREATE OR REPLACE FUNCTION proteger_datos() RETURNS TRIGGER AS $proteger_datos$
DECLARE
BEGIN
-- esta funcion es usada para proteger datos en una table
--no se permitira el borrado de filassi la usamos
--en un disparador de tipo BEFORE / row-level
RETURN NULL;
END;
$proteger_datos$ LANGUAGE plpgsql;
--A continuacion definimos en la tabla productos u disparador del tipo BEFORE / ROW-LEVEL
--para la operacion UPDATE
CREATE TRIGGER proteger_datos BEFORE UPDATE 
ON productos
--definimos nuestro disparador en la tabla productos

