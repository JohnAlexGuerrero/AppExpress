CREATE TABLE unidad (
  idUnidad SERIAL,
  nomund varchar(25) NOT NULL,
  PRIMARY KEY (idUnidad)
);

CREATE TABLE productos (
  idProductos SERIAL,
  datecreated timestamp DEFAULT NOW(),
  Nombre varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (idProductos)
);


CREATE TABLE inventario(
	referencia SERIAL,
	datemodified timestamp DEFAULT NOW(),
	idproducto SMALLINT NOT NULL,
	codigo varchar(10)not null,
	marca VARCHAR(30)NOT NULL,
	pcosto decimal(10,2) NOT NULL DEFAULT '0.00',
	pventa decimal(10,2) NOT NULL DEFAULT '0.00',
	color varchar(20) DEFAULT 'NO APLICA',
	Stock SMALLINT DEFAULT '0',
	idUnd SMALLINT NOT NULL,
	PRIMARY KEY(referencia),
	CONSTRAINT fk_ref FOREIGN KEY(referencia) REFERENCES productos(idproductos)ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_idUnidad FOREIGN KEY (idUnd) REFERENCES Unidad (idUnidad) ON DELETE NO ACTION ON UPDATE NO ACTION
);


ALTER TABLE productos DROP COLUMN idCategoria;

ALTER TABLE productos ADD COLUMN idUnid SMALLINT;


SELECT nombre,nomund,stock FROM productos JOIN unidad  ON idunidad=idund
join caracteristicas on idproductos=idproductos;

DELETE FROM productos
  WHERE idproductos=4;

CREATE FUNCTION insertar(name_p VARCHAR(20), costo smallint) RETURNS void AS $$
	BEGIN
		INSERT INTO productos(nombre,pcosto) VALUES (name_p, costo);
	END;
$$ LANGUAGE plpgsql;

select insertar('dkjfkdjfkdf',2342);
 
DROP TABLE productos caracteristicas ;  