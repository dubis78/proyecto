const express = require("express");
const morgan = require("morgan");
const app = express();
const control = require("./routes/control");
require('dotenv').config();

//Middlewares
app.use(morgan("dev")); 
app.use(express.json()); 

app.get("/", (req,res) => {
  res.send('<h1>Bienvenido</h1>');
});

app.use("/api", control);

app.set('port', process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}!`);
});
