const rp = require("request-promise");
const $ = require("cheerio");

//  ============================================================================================================
//  ============================================================================================================
//
//  Solo Vuelos
//
//  ============================================================================================================
//  ============================================================================================================

const soloVuelos = async () => {
  // Esta va a ser la web para el scraping
  const url = "https://www.aa2000.com.ar/ezeiza";
  const dataVuelos = await rp(url);

  try {
    // Esta búsqueda nos devuelve la lista de textos que nos interesan
    const vuelos = $("#arribos .popup .vuelo", dataVuelos);

    // // En este vamos a pushear lo que nos interesa
    let listaArribos = [];

    // En el array, tenemos que buscar adentro los textos con info que queremos mostrar
    for (let i = 0; i < vuelos.length; i++) {
      // Creamos el objeto solo con la parte de texto que nos interesa, formateada.

      let info = {
        vuelo: vuelos[i].children[0].data.trim(),
      };
      // Lo agregamos a la lista de arribos
      listaArribos.push(info);
    }

    return listaArribos;
  } catch (error) {
    // Con esto seteamos que el front muestre la falta de datos sin que se rompa
    console.log(error);
    return error;
  }
};

//  ============================================================================================================
//  ============================================================================================================
//
//  Solo Partidas
//
//  ============================================================================================================
//  ============================================================================================================

const soloPartidas = async () => {
  // Esta va a ser la web para el scraping
  const url = "https://www.aa2000.com.ar/ezeiza";
  const dataVuelos = await rp(url);

  try {
    // Esta búsqueda nos devuelve la lista de textos que nos interesan
    const vuelos = $("#arribos .popup .vuelo", dataVuelos);

    // // En este vamos a pushear lo que nos interesa
    let listaArribos = [];

    // En el array, tenemos que buscar adentro los textos con info que queremos mostrar
    for (let i = 0; i < vuelos.length; i++) {
      // Creamos el objeto solo con la parte de texto que nos interesa, formateada.

      let info = {
        vuelo: vuelos[i].children[0].data.trim(),
      };
      // Lo agregamos a la lista de arribos
      listaArribos.push(info);
    }

    return listaArribos;
  } catch (error) {
    // Con esto seteamos que el front muestre la falta de datos sin que se rompa
    console.log(error);
    return error;
  }
};

//  ============================================================================================================
//  ============================================================================================================
//
//  Arribos
//
//  ============================================================================================================
//  ============================================================================================================

const arribos = async () => {
  // Esta va a ser la web para el scraping
  const url = "https://www.aa2000.com.ar/ezeiza";
  const dataVuelos = await rp(url);

  try {
    // Esta búsqueda nos devuelve la lista de textos que nos interesan
    const horario = $("#arribos .popup .stda", dataVuelos);
    const vuelos = $("#arribos .popup .vuelo", dataVuelos);
    const linea = $(".linea > span", dataVuelos);
    const ciudad = $(".ciudad", dataVuelos);
    const termsec = $(".termsec", dataVuelos);
    const status = $(".statusText", dataVuelos);
    const estima = $(".estima", "#arribos", dataVuelos);

    // let datos = Array.from(estima[1].children[0].data).join("");

    // // En este vamos a pushear lo que nos interesa
    let listaArribos = [];

    // En el array, tenemos que buscar adentro los textos con info que queremos mostrar
    for (let i = 0; i < vuelos.length; i++) {
      // Creamos el objeto solo con la parte de texto que nos interesa, formateada.

      let estimado = "";

      if (estima[i].children[0]) {
        estimado = estima[i].children[0].data;
      } else {
        estimado = "Sin Estimación";
      }

      let info = {
        tipo: "Arribo",
        horario: horario[i].children[0].data.trim(),
        vuelo: vuelos[i].children[0].data.trim(),
        linea: linea[i].children[0].data.trim(),
        ciudad: ciudad[i].children[0].data,
        estima: estimado,
        termsec: termsec[i].children[0].data.trim(),
        status: status[i].children[0].data.trim(),
      };
      // Lo agregamos a la lista de arribos
      listaArribos.push(info);
    }

    return listaArribos;
  } catch (error) {
    // Con esto seteamos que el front muestre la falta de datos sin que se rompa
    console.log(error);
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
  soloVuelos,
  partidas
};
