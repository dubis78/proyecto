const {Router}=require('express');
const {cnn_mysql}=require('../config/database');
const router = Router();

router.post("/marcas", async(req,res) =>{
  try {
    req.body.forEach(async(reg) => {
      const {ID_MARCA,DESC_MARCA,ACTIVO} = reg;
      await cnn_mysql.execute(`INSERT INTO TIPO_MARCA VALUES (?, ?, ?)`,[ID_MARCA,DESC_MARCA,ACTIVO]);
    });
    res.json({message: `Marcas agregadas` });             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 

router.post("/lineas", async(req,res) =>{
  try {
    req.body.forEach(async(reg) => {
      const {ID_LINEA, DESC_LINEA, ID_MARCA, ACTIVO} = reg;
      await cnn_mysql.execute(`INSERT INTO TIPO_LINEA VALUES (?, ?, ?, ?)`,[ID_LINEA, DESC_LINEA, ID_MARCA, ACTIVO]);
    });
    res.json({message: `Lineas agregadas` });             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 


router.post("/vehiculos", async(req,res) =>{
  try {
    req.body.forEach(async(reg) => {
      const {NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO} = reg;
      await cnn_mysql.execute(`INSERT INTO VEHICULOS VALUES (?, ?, ?, ?, ?, ?)`,[NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO]);
    });
    res.json({message: `vehiculos agregadas`});             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/tipos-marca", async(req,res) =>{
  const [rows]=await cnn_mysql.execute(`SELECT ID_MARCA, DESC_MARCA, IF(ACTIVO = 'S', 'ACTIVO', 'INACTIVO') AS ESTADO FROM TIPO_MARCA WHERE DESC_MARCA != 'NULL'`); 
  if(rows[0]){res.json(rows);
  }
  else{
    res.json({});
  }  
});

router.get("/tipos-linea", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT ID_LINEA, DESC_LINEA, ID_MARCA, IF(ACTIVO = 'S', 'ACTIVO', 'INACTIVO') AS ESTADO  FROM TIPO_LINEA WHERE DESC_LINEA != 'NULL'`);
    res.json(rows);
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/vehiculos", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT NRO_PLACA, ID_LINEA, MODELO AS '#ModeloVehiculo', FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO FROM VEHICULOS WHERE FECHA_VEN_SEGURO != 'NULL'`);
      res.json(rows);
      
    } catch (e) {
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
  } catch (e) {
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
    } catch (e) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });



router.get("/max-min-vehiculos", async(req,res) =>{
    try {
      const [rows]=await cnn_mysql.execute(`SELECT MIN(MODELO) AS 'modelo_min', MAX(MODELO) AS 'modelo_max' FROM VEHICULOS`);
      if(rows[0]){
          res.json(rows[0]);
        }        
    } catch (e) {
      res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
    }
  });



router.get("/tot-line-per-brand", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT TIPO_LINEA.DESC_LINEA, TIPO_MARCA.DESC_MARCA, TIPO_LINEA.ID_MARCA,COUNT(TIPO_LINEA.ID_MARCA) AS 'TOTAL-LINEAS-POR-MARCA' FROM TIPO_LINEA INNER JOIN TIPO_MARCA ON TIPO_MARCA.ID_MARCA = TIPO_LINEA.ID_MARCA GROUP BY TIPO_LINEA.ID_MARCA`);
    if(rows[0]){
        res.json(rows);
      }        
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/rang-date-exp", async(req,res) =>{
  try {
    const {start,end} = req.query;
    console.log(`SELECT * FROM 'VEHICULOS' WHERE FECHA_VEN_SEGURO BETWEEN '${start}' AND '${end}'`);
    const [rows]=await cnn_mysql.execute(`SELECT * FROM VEHICULOS WHERE FECHA_VEN_SEGURO BETWEEN ? AND ?`,[start,end]);
    if(rows[0]){
        res.json(rows);
      }        
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/rang-mod", async(req,res) =>{
  try {
    const {start,end} = req.query;
    const [rows]=await cnn_mysql.execute(`SELECT * FROM VEHICULOS WHERE MODELO BETWEEN '${start}' AND '${end}'`);
    if(rows[0]){
        res.json(rows);
      }        
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 



router.patch("/update-marca/:id", async(req,res) =>{
  try {
    if (Object.keys(req.body).length > 0) { //Object.keys retorna un array de los "indices" de los elementos de un object o array
      const id = req.params.id
      let SQL = 'UPDATE TIPO_MARCA SET '
      const params = []

      for (const elment in req.body) {
          SQL += `${elment} = ?, `
          params.push(req.body[elment])
      }
      SQL = SQL.slice(0, -2)
      SQL += ` WHERE ID_MARCA = ?`
      params.push(id)
      console.log(SQL, params)
      let [rows] = await cnn_mysql.execute(SQL, params)
      
      if (rows.affectedRows > 0) {
          [rows] = await cnn_mysql.query(`SELECT * FROM TIPO_MARCA WHERE ID_MARCA = ?`, [id])
          res.json(rows[0])
      }else{
          res.json({})
      }
  } 
    else {
      res.status(401).json({ message: 'No existe campos a modificar' })
    }     
  } 
  catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 

router.patch("/update-linea/:id", async(req,res) =>{
  try {
    if (Object.keys(req.body).length > 0) { //Object.keys retorna un array de los "indices" de los elementos de un object o array
      const id = req.params.id
      let SQL = 'UPDATE TIPO_LINEA SET '
      const params = []

      for (const elment in req.body) {
          SQL += `${elment} = ?, `
          params.push(req.body[elment])
      }
      SQL = SQL.slice(0, -2)
      SQL += ` WHERE ID_LINEA = ?`
      params.push(id)
      console.log(SQL, params)
      let [rows] = await cnn_mysql.execute(SQL, params)
      
      if (rows.affectedRows > 0) {
          [rows] = await cnn_mysql.query(`SELECT * FROM TIPO_LINEA WHERE ID_LINEA = ?`, [id])
          res.json(rows[0])
      }else{
          res.json({})
      }
  } 
    else {
      res.status(401).json({ message: 'No existe campos a modificar' })
    }     
  } 
  catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 
  
router.patch("/update-vehiculo/:id", async(req,res) =>{
  try {
    if (Object.keys(req.body).length > 0) { //Object.keys retorna un array de los "indices" de los elementos de un object o array
      const id = req.params.id;
      let SQL = 'UPDATE VEHICULOS SET '
      const params = []

      for (const elment in req.body) {
          SQL += `${elment} = ?, `
          params.push(req.body[elment])
      }
      SQL = SQL.slice(0, -2)
      SQL += ` WHERE NRO_PLACA = ?`
      params.push(id)
      console.log(SQL, params)
      let [rows] = await cnn_mysql.execute(SQL, params)
      
      if (rows.affectedRows > 0) {
          [rows] = await cnn_mysql.query(`SELECT * FROM VEHICULOS WHERE NRO_PLACA = ?`, [id])
          res.json(rows[0])
      }else{
          res.json({})
      }
  } 
    else {
      res.status(401).json({ message: 'No existe campos a modificar' })
    }     
  } 
  catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 



router.post("/new-marca", async(req,res) =>{
  try {
    const {ID_MARCA,DESC_MARCA,ACTIVO} = req.body;
    const [rows]=await cnn_mysql.execute(`INSERT INTO TIPO_MARCA (ID_MARCA, DESC_MARCA, ACTIVO) VALUES (?, ?, ?)`,[ID_MARCA,DESC_MARCA,ACTIVO]);
    res.json({message: `Nueva marca agregada con id= ${rows.insertId}` });
             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 

router.delete("/marca/:id", async(req,res) =>{
  try {
    const id = req.params.id
    const [rows]=await cnn_mysql.execute(`DELETE FROM TIPO_MARCA WHERE ID_MARCA = ?`,[id]);
    res.json({message: `Registro con id= ${id} eliminado` });
             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
}); 



router.get("/placa-mod-lin-marc", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT VEHICULOS.NRO_PLACA, VEHICULOS.MODELO, TIPO_LINEA.DESC_LINEA, TIPO_MARCA.DESC_MARCA FROM VEHICULOS INNER JOIN TIPO_LINEA ON TIPO_LINEA.ID_LINEA = VEHICULOS.ID_LINEA INNER JOIN TIPO_MARCA ON TIPO_MARCA.ID_MARCA = TIPO_LINEA.ID_MARCA`);
    res.json(rows);
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/placa-mod-lin-marc-s", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT VEHICULOS.NRO_PLACA, VEHICULOS.MODELO, TIPO_LINEA.DESC_LINEA, TIPO_MARCA.DESC_MARCA FROM VEHICULOS INNER JOIN TIPO_LINEA ON TIPO_LINEA.ID_LINEA = VEHICULOS.ID_LINEA INNER JOIN TIPO_MARCA ON TIPO_MARCA.ID_MARCA = TIPO_LINEA.ID_MARCA WHERE TIPO_LINEA.ACTIVO = 'S'`);
    res.json(rows);
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/sum-mod", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT MODELO FROM VEHICULOS`);
    console.log(rows);
    let tot=0;
    for(let i=0; i< rows.length; i++){
      tot += parseInt(rows[i].MODELO);
    }
    console.log(tot);
    res.json({'suma-modelos':`${tot}`});
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/prom-mod", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT MODELO FROM VEHICULOS`);
    console.log(rows);
    let tot=0;
    for(let i=0; i< rows.length; i++){
      tot += parseInt(rows[i].MODELO);
    }
    console.log(tot);
    res.json({'prom-modelos':`${((tot/rows.length).toFixed(2))}`});
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/tot-estado", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT COUNT(ACTIVO) AS TOTAL_REGISTROS, ACTIVO AS ESTADO FROM TIPO_LINEA GROUP BY ACTIVO`);
    //console.log(rows);
    for(let i=0; i< rows.length; i++){
      if(rows[i].ESTADO==='N'){
        rows[i].ESTADO='Inactivo'
      }
      else if(rows[i].ESTADO==='S'){
        rows[i].ESTADO='Activo'
      }
    }
    res.json(rows);    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});



router.get("/inner-join", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT VEHICULOS.NRO_PLACA, VEHICULOS.MODELO, TIPO_LINEA.DESC_LINEA, TIPO_MARCA.DESC_MARCA FROM VEHICULOS INNER JOIN TIPO_LINEA ON TIPO_LINEA.ID_LINEA = VEHICULOS.ID_LINEA INNER JOIN TIPO_MARCA ON TIPO_MARCA.ID_MARCA = TIPO_LINEA.ID_MARCA`);
    res.json(rows);
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});

router.get("/left-join", async(req,res) =>{
  try {
    const [rows]=await cnn_mysql.execute(`SELECT VEHICULOS.NRO_PLACA, VEHICULOS.MODELO, TIPO_LINEA.DESC_LINEA, TIPO_MARCA.DESC_MARCA FROM VEHICULOS LEFT JOIN TIPO_LINEA ON TIPO_LINEA.ID_LINEA = VEHICULOS.ID_LINEA LEFT JOIN TIPO_MARCA ON TIPO_MARCA.ID_MARCA = TIPO_LINEA.ID_MARCA`);
    res.json(rows);
    
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error en el servidor"})
  }
});


module.exports= router;