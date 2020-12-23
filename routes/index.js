var express = require("express");
var router = express.Router();
const helpers = require("../helpers");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/buscarArribo", async (req, res) => {
  const { codigoArribo } = req.body;

  const vuelo = await helpers.arribos(codigoArribo);

  if (vuelo) {
    return res.send(vuelo);
  }

  res.send("No data.");
});

module.exports = router;
