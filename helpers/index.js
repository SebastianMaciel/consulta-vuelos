const rp = require("request-promise");
const $ = require("cheerio");

//  ============================================================================================================
//  ============================================================================================================
//
//  Arribos
//
//  ============================================================================================================
//  ============================================================================================================
const arribos = async (codigoArribo) => {
  // Esta va a ser la web para el scraping
  const url = "https://www.aa2000.com.ar/ezeiza";
  const dataVuelos = await rp(url);

  // console.log(transito);

  try {
    // Esta búsqueda nos devuelve la lista de textos que nos interesan
    const horario = $("#arribos .popup .stda", dataVuelos);
    const vuelos = $("#arribos .popup .vuelo", dataVuelos);
    const linea = $("#arribos .popup .linea > span", dataVuelos);
    const ciudad = $("#arribos .popup .ciudad", dataVuelos);
    // const estimado = $("#arribos .estima", dataVuelos);
    const termsec = $("#arribos .popup .termsec", dataVuelos);
    const status = $("#arribos .popup .statusText", dataVuelos);

    // // En este vamos a pushear lo que nos interesa
    let listaArribos = [];

    // En el array, tenemos que buscar adentro los textos con info que queremos mostrar
    for (let i = 0; i < vuelos.length; i++) {
      // Creamos el objeto solo con la parte de texto que nos interesa, formateada.
      let info = {
        tipo: "Arribo",
        horario: horario[i].children[0].data.trim(),
        vuelo: vuelos[i].children[0].data.trim(),
        linea: linea[i].children[0].data.trim(),
        ciudad: ciudad[i].children[0].data.trim(),
        // estimado: estimado[i].children[0].data,
        termsec: termsec[i].children[0].data.trim(),
        status: status[i].children[0].data.trim(),
      };
      // Lo agregamos a la lista de arribos
      listaArribos.push(info);
    }

    // Para buscar un valor:

    let match = listaArribos.find((vuelos) => vuelos.vuelo === codigoArribo);

    if (match) {
      return match;
    }

    return false;

    // return match;

    // // Mandamos la lista para que se use en el front
    // console.log(listaArribos);
  } catch (error) {
    // Con esto seteamos que el front muestre la falta de datos sin que se rompa
    return error;
  }
};

//  ============================================================================================================
//  ============================================================================================================
//
//  Partidas
//
//  ============================================================================================================
//  ============================================================================================================

const partidas = async (codigoPartida) => {
  // Esta va a ser la web para el scraping
  const url = "https://www.aa2000.com.ar/ezeiza";
  const dataVuelos = await rp(url);

  try {
    // Esta búsqueda nos devuelve la lista de textos que nos interesan
    const horario = $("#partidas .popup .stda", dataVuelos);
    const vuelos = $("#partidas .popup .vuelo", dataVuelos);
    const status = $("#partidas .popup .statusText", dataVuelos);
    const linea = $("#partidas .popup .linea > span", dataVuelos);
    const ciudad = $("#partidas .popup .ciudad", dataVuelos);

    // // En este vamos a pushear lo que nos interesa
    let listaPartidas = [];

    // En el array, tenemos que buscar adentro los textos con info que queremos mostrar
    for (let i = 0; i < vuelos.length; i++) {
      // Creamos el objeto solo con la parte de texto que nos interesa, formateada.
      let info = {
        tipo: "Partida",
        vuelo: vuelos[i].children[0].data.trim(),
        linea: linea[i].children[0].data.trim(),
        status: status[i].children[0].data.trim(),
        ciudad: ciudad[i].children[0].data.trim(),
        horario: horario[i].children[0].data.trim(),
      };
      // Lo agregamos a la lista de partidas
      listaPartidas.push(info);
    }

    // // Mandamos la lista para que se use en el front
    // console.log(listaPartidas);
  } catch (error) {
    // Con esto seteamos que el front muestre la falta de datos sin que se rompa
    return error;
  }
};

//  ============================================================================================================
//  ============================================================================================================
//
//  Exports
//
//  ============================================================================================================
//  ============================================================================================================
module.exports = {
  arribos,
};
