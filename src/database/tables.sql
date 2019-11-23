CREATE TABLE unidad (
  idUnidad SERIAL,
  nomund varchar(25) NOT NULL,
  PRIMARY KEY (idUnidad)
);

CREATE TABLE productos (
  idProductos SERIAL,
  datecreated date NOT NULL,
  datemodified date NOT NULL,
  referencia varchar(10) NOT NULL UNIQUE,
  Nombre varchar(45) NOT NULL UNIQUE,
  Stock SMALLINT DEFAULT '0',
  idUnd SMALLINT NOT NULL,
  marca VARCHAR(30)NOT NULL,
  color varchar(20) DEFAULT 'NO APLICA',
  pcosto decimal(10,2) NOT NULL DEFAULT '0.00',
  pventa decimal(10,2) NOT NULL DEFAULT '0.00',
  porcentaje decimal(10,2) NOT NULL,
  PRIMARY KEY (idProductos),
  CONSTRAINT fk_idUnidad FOREIGN KEY (idUnd) REFERENCES Unidad (idUnidad) ON DELETE NO ACTION ON UPDATE NO ACTION
)

ALTER TABLE productos DROP COLUMN idCategoria;

ALTER TABLE productos ADD COLUMN idUnid SMALLINT;


SELECT * FROM productos JOIN unidad  USING idunidad;

DROP TABLE productos;