import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAllMyCountries,
  filterByActivities,
  getAllActivities,
  poblacionMenorAMil,
  wayToOrderCountries,
} from "../actions/actionsMain";
import F from "../styles/Form.module.css";

// * FORM-DE-ORDENAMIENTO Y Filtrado;
const Form = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const activities = useSelector(
    (state) => state.reducerMain.allActivitiesCopy
  );
  const [values, setValues] = useState({
    continent: "",
    ordenamiento: "",
    activity: "",
  });

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handlerChangeOrder = (e) => {
    // formas de ordenamiento
    dispatch(wayToOrderCountries(e.target.value));
    setCurrentPage(1);
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlerChangeFilter = (e) => {
    // filtrado por continentes
    dispatch(filterAllMyCountries(e.target.value));
    setCurrentPage(1);
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
      ordenamiento: "",
      activity: "",
    });
  };

  const handlerFilterByActivity = (e) => {
    // Filtrar por actividades creadas
    dispatch(filterByActivities(e.target.value));
    setCurrentPage(1);
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
      continent: "",
      ordenamiento: "",
    });
  };

  const handlerThousent = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    
    dispatch(poblacionMenorAMil(value));
    setCurrentPage(1)  
  };

  return (
    <div className={`${F.FormasDeOrdenamiento}`}>
      <div>
        <label htmlFor="continent">Continente: </label>
        <br />
        <select
          id="continent"
          name="continent"
          onChange={(e) => handlerChangeFilter(e)}
          value={values.continent}
        >
          <option value="">---</option>
          <option value="">Todos</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <div>
        <label htmlFor="ordernamiento">orden: </label>
        <br />
        <select
          id="ordenamiento"
          name="ordenamiento"
          onChange={(e) => handlerChangeOrder(e)}
          value={values.ordenamiento}
        >
          <option value="">---</option>
          <option value="a-z">A-Z</option>
          <option value="a-z-desc">Z-A</option>
          <option value="population">Mayor-Menor Poblacion</option>
          <option value="population-desc">Menor-Mayor Poblacion</option>
        </select>
      </div>
      <div>
        <label htmlFor="activity">Actividad</label>
        <br />
        <select
          value={values.activity}
          name="activity"
          id="activity"
          onChange={(e) => handlerFilterByActivity(e)}
        >
          <option value="">---</option>
          {activities.map((i) => (
            <option key={i.id} value={i.nombre}>
              {i.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">Mas Filtros</label>
        <br />
      <select
          name="menor-a-mil"
          // value={}
          onChange={(e) => handlerThousent(e)}
        >
          <option value="">---</option>
          <option value="999">poblacion menor a 1000</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
