CREATE TABLE Categoria (
  idSubCategoria SERIAL,
  Nombre varchar(25) NOT NULL,
  idCategoria SMALLINT DEFAULT NULL,
  PRIMARY KEY (idSubCategoria)
)

CREATE TABLE productos (
  idProductos SERIAL,
  Nombre varchar(45) NOT NULL UNIQUE,
  Precio decimal(10,2) NOT NULL DEFAULT '0.00',
  Stock SMALLINT DEFAULT '0',
  Foto varchar(120) DEFAULT '-',
  idCategoria SMALLINT NOT NULL,
  Descripcion varchar(100) DEFAULT 'NULL',
  PrecioCosto decimal(10,2) NOT NULL DEFAULT '0.00',
  Destacado SMALLINT DEFAULT '0',
  Oferta SMALLINT DEFAULT '0',
  PRIMARY KEY (idProductos),
  CONSTRAINT fk_idCategoria FOREIGN KEY (idCategoria) REFERENCES Categoria (idSubCategoria) ON DELETE NO ACTION ON UPDATE NO ACTION
)