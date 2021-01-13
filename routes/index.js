const express = require("express");
const router = express.Router();
const helpers = require("../helpers");

router.get("/", async (req, res) => {
  const vuelos = await helpers.soloVuelos();

  console.log(vuelos);

  res.render("index", { vuelos });
});

router.post("/buscarArribo", async (req, res) => {
  const { codigoArribo } = req.body;

  const vuelos = await helpers.arribos();

  let vuelo = vuelos.find((vuelos) => vuelos.vuelo === codigoArribo.toUpperCase());

  if (vuelo) {
    return res.render("vuelo", { vuelo });
  }

  res.render("vuelo", { vuelo: undefined, codigo: codigoArribo.toUpperCase() });
});

router.get("/ver-arribos", async (req, res) => {
  const vuelos = await helpers.arribos();

  res.render("ver-arribos", { vuelos });
});

router.get("/verArriboDesdeTabla/:codigoArribo", async (req, res) => {
  const { codigoArribo } = req.params;

  const vuelos = await helpers.arribos();

  let vuelo = vuelos.find((vuelos) => vuelos.vuelo === codigoArribo.toUpperCase());

  if (vuelo) {
    return res.render("vuelo", { vuelo });
  }

  res.render("vuelo", { vuelo: undefined, codigo: codigoArribo.toUpperCase() });
});

module.exports = router;
