const {Router}=require('express');
const {cnn_mysql}=require('../config/database');
const router = Router();

router.get("/tipos-marca", async(req,res) =>{
  const [rows]=await cnn_mysql.execute(`SELECT * FROM TIPO_MARCA`); 
  if(rows[0]){res.json(rows);
  }
  else{
    res.json({});
  }  
});

router.get("/tipos-linea", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT * FROM TIPO_LINEA`);
    res.json(rows);
    
  } catch (error) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/vehiculos", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT * FROM VEHICULOS`);
      res.json(rows);
      
    } catch (error) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });



router.get("/check-marca", async(req,res) =>{
  const [rows]=await cnn_mysql.execute(`SELECT COUNT(*) FROM TIPO_MARCA`); 
  if(rows[0]){
    if(rows[0]['COUNT(*)']===5){
      res.send(`<h1>Tabla TIPO_MARCA cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
    }  //rows[0]['COUNT(*)'] se almacena el tamaño la respuesta del query COUNT
    else{
      res.send(`<h1>Tabla TIPO_MARCA no cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
    }
  }
  else{
    res.json({});
  }  
});

router.get("/check-linea", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT COUNT(*) FROM TIPO_LINEA`);
    if(rows[0]){
      if(rows[0]['COUNT(*)']===20){
        res.send(`<h1>Tabla TIPO_LINEA cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
      }  //rows[0]['COUNT(*)'] se almacena el tamaño la respuesta del query COUNT
      else{
        res.send(`<h1>Tabla TIPO_LINEA no cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
      }
    } 
  } catch (error) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/check-vehiculos", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT COUNT(*) FROM VEHICULOS`);
      if(rows[0]){
        if(rows[0]['COUNT(*)']===30){
          res.send(`<h1>Tabla VEHICULOS cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
        }  //rows[0]['COUNT(*)'] se almacena el tamaño la respuesta del query COUNT
        else{
          res.send(`<h1>Tabla VEHICULOS no cumple! tiene ${rows[0]['COUNT(*)']} registros</h1>`);
        }
      }        
    } catch (error) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });


router.get("/max-min-vehiculos", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT MIN(MODELO) AS 'modelo_min', MAX(MODELO) AS 'modelo_max' FROM VEHICULOS`);
      if(rows[0]){
          res.json(rows[0]);
        }        
    } catch (error) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });


  router.get("/tot-line-per-brand", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT TIPO_LINEA.DESC_LINEA, tipo_marca.DESC_MARCA, TIPO_LINEA.ID_MARCA,COUNT(TIPO_LINEA.ID_MARCA) AS 'total-lineas-por-marca' FROM TIPO_LINEA INNER JOIN tipo_marca ON tipo_marca.ID_MARCA = tipo_linea.ID_MARCA GROUP by TIPO_LINEA.ID_MARCA`);
      if(rows[0]){
          res.json(rows);
        }        
    } catch (error) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });

module.exports= router;