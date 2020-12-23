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
    console.log(vuelo);
    return res.render("vuelo", { vuelo });
  }

  console.log(vuelo);
  res.render("vuelo");
});

module.exports = router;
