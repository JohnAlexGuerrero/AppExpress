CREATE TABLE compras (
    idcompra integer NOT NULL,
    datecreated timestamp without time zone DEFAULT now(),
    factura character varying(20) NOT NULL,
    id_producto smallint NOT NULL,
    cantidad smallint NOT NULL,
    costo numeric(10,2) DEFAULT 0.00 NOT NULL,
    total numeric(10,2) DEFAULT 0.00 NOT NULL,
    id_proveedor smallint NOT NULL
);

CREATE TABLE productos (
    idproductos SERIAL,
    datemodified timestamp without time zone DEFAULT now(),
    nombre character varying(45) NOT NULL,
    stock smallint DEFAULT 0::smallint,
    idund smallint NOT NULL,
    pcosto numeric(10,2) DEFAULT 0.00 NOT NULL
);

ALTER TABLE ONLY productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (idproductos);

CREATE TABLE proveedor (
    idproveedor integer NOT NULL,
    nombre_prov character varying(40) NOT NULL,
    vendedor character varying(40)
);

CREATE TABLE unidad (
    idunidad integer NOT NULL,
    nomund character varying(25) NOT NULL
);

CREATE TABLE ventas (
    idventa SERIAL,
    datecreated timestamp without time zone DEFAULT now(),
    idproducto smallint NOT NULL,
    cantidad smallint NOT NULL,
    precio numeric(10,2) DEFAULT 0.00 NOT NULL,
    total numeric(10,2) DEFAULT 0.00 NOT NULL,
    PRIMARY KEY(idventa),
    CONSTRAINT fk_producto FOREIGN KEY (idproducto) REFERENCES productos(idproductos)
);



--llaves primarias

ALTER TABLE ONLY compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (idcompra);

    
ALTER TABLE ONLY productos
    ADD CONSTRAINT productos_nombre_key UNIQUE (nombre);

drop table carrito

    
ALTER TABLE ONLY proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (idproveedor);

    
ALTER TABLE ONLY unidad
    ADD CONSTRAINT unidad_pkey PRIMARY KEY (idunidad);

    
ALTER TABLE ONLY ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (idventa);

    ALTER TABLE ONLY productos
    ADD CONSTRAINT fk_idunidad FOREIGN KEY (idund) REFERENCES public.unidad(idunidad);

    
ALTER TABLE ONLY ventas
    ADD 

    
ALTER TABLE ONLY compras
    ADD CONSTRAINT fk_refproducto FOREIGN KEY (id_producto) REFERENCES public.productos(idproductos);

    
ALTER TABLE ONLY compras
    ADD CONSTRAINT fk_refproveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(idproveedor);

--poblar tablas


INSERT INTO unidad(idunidad,nomund)VALUES(1,'UND');
INSERT INTO unidad(idunidad,nomund)VALUES(2,'ROLLO');
INSERT INTO unidad(idunidad,nomund)VALUES(3,'CANECA');
INSERT INTO unidad(idunidad,nomund)VALUES(4,'GALON');
INSERT INTO unidad(idunidad,nomund)VALUES(5,'MTR');
INSERT INTO unidad(idunidad,nomund)VALUES(6,'KILO');


INSERT INTO productos(nombre,stock,idund,pcosto) VALUES('SIFON LAVAPLATOS 2 PULG RIOPLAST',12,1,3000);
INSERT INTO productos(nombre,stock,idund,pcosto) VALUES('REJILLA 2 PULG CON SOSCO ALUMINIO',12,1,2000);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(3,'28-06-2019','MANGUERA AGRICOLA 1/2 X 100 MTRS UNIPLAST',0,2,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(4,'28-06-2019','CALTEK X 10KL',0,1,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(5,'28-06-2019','MALLA TEJIDA 0.90X2MTR CAL.14',0,1,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(6,'28-06-2019','INTERRUPTOR SENCILLO AVE',0,1,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(7,'28-06-2019','SIKA JOINT COMPOUND X 27 KL',0,3,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(8,'28-06-2019','ESTUKADOS X 40 KILOS',0,1,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(9,'28-06-2019','TREFITECHO 2.44 MTR GALVALUME C.35',0,1,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(10,'28-06-2019','CABLE MATIZADO N. 6',0,5,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(11,'28-06-2019','CUERDA NAYLON N. 4X250 MTRS',0,5,0,0);
INSERT INTO productos(idproductos,datemodified,nombre,stock,idund,pcosto,total) VALUES(12,'28-06-2019','MANGUERA AGRICOLA 3/4 X 100 MTRS UNIPLAST',0,2,0,0);


INSERT INTO proveedor(idproveedor,nombre_prov,vendedor) VALUES(1,'UNIPLAST','CRISTIAN');
INSERT INTO proveedor(idproveedor,nombre_prov,vendedor) VALUES(2,'DM SOGAS','MAURICIO');
INSERT INTO proveedor(idproveedor,nombre_prov,vendedor) VALUES(3,'TREFILADOS','CRISTIAN');
INSERT INTO proveedor(idproveedor,nombre_prov,vendedor) VALUES(4,'FERRECOL','SAUL OLIVA');


INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(1,'28-06-2019','FFCO 816347',7,10,29000,290000,4);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(2,'28-06-2019','FFCO 816347',8,5,36000,180000,4);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(3,'28-06-2019','PTO 89235',9,2,14200,28400,3);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(4,'28-06-2019','MA951',10,500,243,121500,2);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(5,'28-06-2019','MA951',11,250,298,74500,2);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(6,'28-06-2019','233',3,10,27000,270000,1);
INSERT INTO compras(idcompra,datecreated,factura,id_producto,cantidad,costo,total,id_proveedor) VALUES(7,'28-06-2019','233',12,5,37000,185000,1);


INSERT INTO ventas(idventa,datecreated,id_producto,cantidad,precio,total)VALUES(1,'28-06-2019',1,1,26500,26500);
INSERT INTO ventas(idventa,datecreated,id_producto,cantidad,precio,total)VALUES(2,'28-06-2019',2,15,23500,352500);
INSERT INTO ventas(idventa,datecreated,id_producto,cantidad,precio,total)VALUES(3,'28-06-2019',3,1,38000,38000);
INSERT INTO ventas(idventa,datecreated,id_producto,cantidad,precio,total)VALUES(4,'28-06-2019',4,2,9500,19000);
INSERT INTO ventas(idventa,datecreated,id_producto,cantidad,precio,total)VALUES(5,'28-06-2019',5,2,46000,92000);

INSERT INTO ventas(datecreated,idproducto,cantidad,precio,total)VALUES('01-11-2019',37,2,30000,60000);


-consultas
SELECT * FROM productos 

drop table productos;

drop table carrito



--consultas

--total inventarios productos x costo

CREATE TABLE INVENTARIO AS
SELECT nombre,(stock*pcosto) as total FROM productos


SELECT count(idproductos),idproductos,nombre,stock,nomund,pcosto
 FROM productos JOIN unidad ON idund=idunidad
  group by 2,3,4,5,6
  ORDER BY 3

select count(idproductos) from productos

SELECT SUM(TOTAL) FROM INVENTARIO

SELECT DATECREATED,NOMBRE,CANTIDAD,PCOSTO,PRECIO,(PRECIO-PCOSTO)*CANTIDAD AS GANANCIA FROM PRODUCTOS JOIN VENTAS ON IDPRODUCTOS=IDPRODUCTO
WHERE DATECREATED = '%01-11-2019%'

DROP TABLE INVENTARIO

--total de ventas por dia
SELECT SUM(TOTAL) FROM DETALLE JOIN FACTURA ON CODFACTURA=COD_FACTURA where fecha = '2019-07-02'

--TOTAL GANANCIAS
SELECT SUM(TOTAL-CANTIDAD*PCOSTO) AS GAN FROM PRODUCTOS JOIN DETALLE ON IDPRODUCTOS=IDPRODUCTO JOIN FACTURA ON CODFACTURA=COD_FACTURA
 WHERE FECHA = '2019-07-02'

INSERT INTO REPORTE VALUES('2019-07-02',1855400,402250,2170000,275767)
