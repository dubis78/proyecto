-- DROP DATABASE IF EXISTS semillero;
-- CREATE DATABASE semillero;

-- USE semillero;

DROP TABLE IF EXISTS VEHICULOS;
DROP TABLE IF EXISTS TIPO_LINEA;
DROP TABLE IF EXISTS TIPO_MARCA;

CREATE TABLE TIPO_MARCA(
    ID_MARCA  INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    DESC_MARCA VARCHAR(100) COMMENT 'La descripcion es opcional, no es estrictamente necesaria.',
    ACTIVO ENUM('S','N') NOT NULL
);

CREATE TABLE TIPO_LINEA(
    ID_LINEA INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    DESC_LINEA VARCHAR(100) COMMENT 'La descripcion es opcional, no es estrictamente necesaria.',
    ID_MARCA INT(5) UNSIGNED NOT NULL,
    ACTIVO ENUM('S','N') NOT NULL,
    FOREIGN KEY (ID_MARCA) REFERENCES TIPO_MARCA(ID_MARCA) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE VEHICULOS(
    NRO_PLACA INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ID_LINEA INT(5) UNSIGNED NOT NULL,
    MODELO ENUM('2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021') NOT NULL,
    FECHA_VEN_SEGURO DATE COMMENT 'se puede adquirir el vehiculo y posteriormente pagar el seguro.',
    FECHA_VEN_TECNOMECANICA DATE NOT NULL,
    FECHA_VEN_CONTRATODO DATE NOT NULL,
    FOREIGN KEY (ID_LINEA) REFERENCES TIPO_LINEA(ID_LINEA) ON DELETE RESTRICT ON UPDATE CASCADE
);


INSERT INTO `TIPO_MARCA` (`ID_MARCA`, `DESC_MARCA`, `ACTIVO`) 
VALUES (NULL, 'asdfghjk', 'S'), (NULL, NULL, 'S'), (NULL, NULL, 'N'), (NULL, 'poiuytrewasxc', 'N'),(NULL, NULL, 'S');


INSERT INTO `TIPO_LINEA` (`ID_LINEA`, `DESC_LINEA`, `ID_MARCA`, `ACTIVO`) VALUES (NULL, 'asdfghjklgdgfdga', '2', 'S'), (NULL, 'sffghjklfsee\r\n', '1', 'S'), (NULL, 'bfbfgnfzgfgz', '3', 'S'), (NULL, NULL, '4', 'N'), (NULL, 'fvvfdgfbgvzbfgh', '2', 'N'), (NULL, NULL, '5', 'N'), (NULL, 'gdfzhbzdf dfhfgnzdb', '4', 'S'), (NULL, 'bhdfbfdghngmkjlugdfbsfgz', '5', 'N'), (NULL, 'sdddddddddafafweg', '1', 'S'), (NULL, 'fsavdgfz', '4', 'N'), (NULL, NULL, '1', 'N'), (NULL, NULL, '2', 'N'), (NULL, NULL, '3', 'S'), (NULL, NULL, '1', 'S'), (NULL, 'gtrdgthdeythdd', '1', 'N'), (NULL, 'miuytrhjm vwxcghn', '3', 'N'), (NULL, NULL, '1', 'S'), (NULL, NULL, '3', 'N'), (NULL, 'asdfgujkkmndsz', '5', 'S'), (NULL, 'tehtyetytusr', '4', 'N');


INSERT INTO `VEHICULOS` (`NRO_PLACA`, `ID_LINEA`, `MODELO`, `FECHA_VEN_SEGURO`, `FECHA_VEN_TECNOMECANICA`, `FECHA_VEN_CONTRATODO`) VALUES (NULL, '1', '2015', '2021-05-31', '2021-01-01', '2019-08-01'), (NULL, '13', '2017', '2011-05-31', '2012-01-01', '2000-01-01'), (NULL, '12', '2020', NULL, '2028-05-31', '2022-05-31'), (NULL, '1', '2020', NULL, '2028-07-20', '2026-07-16'), (NULL, '12', '2011', '2022-05-31', '2030-08-10', '2022-05-31'), (NULL, '17', '2018', '2002-05-31', '2042-05-31', '2052-05-31'), (NULL, '11', '2018', '2022-10-28', '2028-05-05', '2042-06-06'), (NULL, '8', '2020', '2022-05-31', '2022-05-31', '2022-05-31'), (NULL, '14', '2018', NULL, '2022-05-31', '2022-05-31'), (NULL, '10', '2013', '2082-01-09', '2026-08-22', '2027-05-11'), (NULL, '1', '2015', '2021-05-31', '2021-01-01', '2019-08-01'), (NULL, '13', '2017', '2011-05-31', '2012-01-01', '2000-01-01'), (NULL, '12', '2020', NULL, '2028-05-31', '2022-05-31'), (NULL, '1', '2020', NULL, '2028-07-20', '2026-07-16'), (NULL, '12', '2011', '2022-05-31', '2030-08-10', '2022-05-31'), (NULL, '17', '2018', '2002-05-31', '2042-05-31', '2052-05-31'), (NULL, '11', '2018', '2022-10-28', '2028-05-05', '2042-06-06'), (NULL, '8', '2020', '2022-05-31', '2022-05-31', '2022-05-31'), (NULL, '14', '2018', NULL, '2022-05-31', '2022-05-31'), (NULL, '10', '2013', '2082-01-09', '2026-08-22', '2027-05-11'), (NULL, '1', '2015', '2021-05-31', '2021-01-01', '2019-08-01'), (NULL, '13', '2017', '2011-05-31', '2012-01-01', '2000-01-01'), (NULL, '12', '2020', NULL, '2028-05-31', '2022-05-31'), (NULL, '1', '2020', NULL, '2028-07-20', '2026-07-16'), (NULL, '12', '2011', '2022-05-31', '2030-08-10', '2022-05-31'), (NULL, '17', '2018', '2002-05-31', '2042-05-31', '2052-05-31'), (NULL, '11', '2018', '2022-10-28', '2028-05-05', '2042-06-06'), (NULL, '8', '2020', '2022-05-31', '2022-05-31', '2022-05-31'), (NULL, '14', '2018', NULL, '2022-05-31', '2022-05-31'), (NULL, '10', '2013', '2082-01-09', '2026-08-22', '2027-05-11');