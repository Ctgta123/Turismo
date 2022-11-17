import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import axios from "axios";
export const form = () => {
  const params = useParams();
  const id = params.id
  const [acompa, setAcompa] = useState([])
  const Api = "https://webapiturismoreal.azurewebsites.net/api/Reserva"
  const [data, setData] = useState({
    idDepartamento: 1,
    fechaInicio: "",
    fechaTermino: "",
    acompa: {
      nombre: "",
      segnombre: "",
      apellidop: "",
      apellidom: "",
      rut: "",
      fechanacimiento: "",
    },
  });
  const handleChange = (k, v) => {

    setData({ k: v });
  }
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   return setData({
  //     ...data,
  //     [e.target.name]: value,
  //   });
  // }
  const registrarBoton = (e) => {
    let url = Api
    e.preventDefault();
    const userData = {
      idDepartamento: data.idDepartamento,
      fechaInicio: data.fechaInicio,
      fechaTermino: data.fechaTermino,
      acompa: {
        nombre: data.nombre,
        segnombre: data.segnombre,
        apellidop: data.apellidop,
        apellidom: data.apellidom,
        rut: data.rut,
        fechanacimiento: data.fechanacimiento,
      }
    };
    axios({
      method: 'post',
      url: url,
      data: {
        idDepartamento: data.idDepartamento,
        fechaInicio: data.fechaInicio,
        fechaTermino: data.fechaTermino,
        acompa: {
          nombre: data.nombre,
          segnombre: data.segnombre,
          apellidop: data.apellidop,
          apellidom: data.apellidom,
          rut: data.rut,
          fechanacimiento: data.fechanacimiento,
        }
      },
    })
      .then(response => {
        console.log("Registrado correctamente");
        navigateTo('/Login')
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("Valores ingresados incorrectamente, intente nuevamente");
        } else if (error.request) {
          console.log("Falla en el servidor");
        } else {
          console.log(error);
        }
      });
  };

  return { data, handleChange, registrarBoton }


}
export default form;