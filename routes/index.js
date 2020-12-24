var express = require("express");
var router = express.Router();
const helpers = require("../helpers");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/buscarArribo", async (req, res) => {
  const { codigoArribo } = req.body;

  const vuelos = await helpers.arribos();

  let vuelo = vuelos.find((vuelos) => vuelos.vuelo === codigoArribo);

  if (vuelo) {
    return res.render("vuelo", { vuelo });
  }

  res.render("vuelo", { vuelo: undefined });
});

router.get("/ver-arribos", async (req, res) => {
  const vuelos = await helpers.arribos();

  res.render("ver-arribos", { vuelos });
});

module.exports = router;
