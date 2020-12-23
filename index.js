const express = require("express");
const app = express();
port = process.env.PORT || 3000;

var appRoutes = require("./routes/index.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/", appRoutes);

// Port Listening
app.listen(port, function () {
  console.log("Consulta de Vuelos - Aeropuertos Argentinos 2000");
  console.log("Creado por Sebastián Maciel");
  console.log("Acceso por el puerto: " + port + ".");
});
