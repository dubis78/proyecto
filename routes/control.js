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





module.exports= router;