// ? ***************Manejo de Base de Datos**************************
const axios = require("axios");
const { Country } = require("./db");

const GET_ALL_DATA = async () => {
  const DATA = await axios.get("https://restcountries.com/v3/all");
  const RESULT = await DATA;
  const arrData = RESULT.data.map((i) => {
    return {
      id: i.cca3.toLowerCase(),
      nombre: i.name.common.toLowerCase(),
      nombre_spa: i.translations.spa.common,
      img_bandera: i.flags[1],
      continente: i.continents[0],
      capital: Array.isArray(i.capital) ? i.capital[0] : i.capital,
      sub_region: i.subregion,
      area: i.area,
      poblacion: i.population
    };
  });

  // console.log(RESULT.data)

  const set_all = () => {
    arrData.map((el) => {
      Country.findOrCreate({
        where: {
          nombre: el.nombre,
          id: el.id,
        },
        defaults: {
          ...el,
        },
      }).catch((err) => {
        console.log(err.message);
      });
    });
  };
  
  return set_all();
};

module.exports = GET_ALL_DATA;
