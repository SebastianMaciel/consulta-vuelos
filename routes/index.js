const express = require("express");
const router = express.Router();
const helpers = require("../helpers");

// Página principal
router.get("/", async (req, res) => {
  // Buscamos todos los vuelos
  const vuelos = await helpers.soloVuelos();

  // Lo llevamos al index
  res.render("index", { vuelos });
});

// Esto busca el arribo que pongamos en el form
router.post("/buscarArribo", async (req, res) => {
  // Desestructuramos
  const { codigoArribo } = req.body;

  // Vamos a traernos todos los arribos
  const vuelos = await helpers.arribos();

  // Chequeamos si tenemos alguna coincidencia con nuestra búsqueda
  let vuelo = vuelos.find((vuelos) => vuelos.vuelo === codigoArribo.toUpperCase());

  // Si hay coincidencias, volcamos los datos
  if (vuelo) {
    return res.render("vuelo", { vuelo });
  }

  // Si no, le indicamos que no hay vuelos con ese código
  res.render("vuelo", { vuelo: undefined, codigo: codigoArribo.toUpperCase() });
});

// Acá vamos a listar todos los arribos
router.get("/ver-arribos", async (req, res) => {
  // Pedimos los arribos
  const vuelos = await helpers.arribos();

  // Los volcamos en el html
  res.render("ver-arribos", { vuelos });
});

// Este lo vamos a usar cuando hacemos clic en algún vuelo desde la tabla completa
router.get("/verArriboDesdeTabla/:codigoArribo", async (req, res) => {
  // Desesctructuramos
  const { codigoArribo } = req.params;

  // Hacemos la búsqueda
  const vuelos = await helpers.arribos();

  // Chequeamos si tenemos alguna coincidencia con nuestra búsqueda
  let vuelo = vuelos.find((vuelos) => vuelos.vuelo === codigoArribo.toUpperCase());

  // Si hay coincidencias, volcamos los datos
  if (vuelo) {
    return res.render("vuelo", { vuelo });
  }

  // Si no, le indicamos que no hay vuelos con ese código
  res.render("vuelo", { vuelo: undefined, codigo: codigoArribo.toUpperCase() });
});


// Buscar Partidas
router.get("/partidas", async (req, res) => {
  // Buscamos todos los vuelos
  const vuelos = await helpers.soloVuelos();

  // Lo llevamos al index
  res.render("index", { vuelos });
});

// Ver Partidas
router.get("/ver-partidas", async (req, res) => {
  // Pedimos los arribos
  const vuelos = await helpers.partidas();

  // Los volcamos en el html
  res.render("ver-partidas", { vuelos });
});

module.exports = router;
