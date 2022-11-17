import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dataUser } from '../../Store/userStore';
import "react-datepicker/dist/react-datepicker.css";
import { Formulario } from "../components/Formulario";
import { form } from "../Hooks/form";
export const Reservar = () => {
  const params = useParams();
  const id = params.id
  const Url = "https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil"
  const baseUrl = "https://webapiturismoreal.azurewebsites.net/api/Department/Perfil/" + id
  const [detalleDepto, setDetalleDepto] = useState([]);
  const token = localStorage.getItem("token")
  const tokenredux = useSelector(dataUser)
  const [count, setCount] = useState(0)
  // const { data, handleChange, registrarBoton } = form();
  // const userData = {
  //   idDepartamento: data.idDepartamento,
  //   fechaInicio: data.fechaInicio,
  //   fechaTermino: data.fechaTermino,
  //   acompa: {
  //     nombre: data.nombre,
  //     segnombre: data.segnombre,
  //     apellidop: data.apellidop,
  //     apellidom: data.apellidom,
  //     rut: data.rut,
  //     fechanacimiento: data.fechanacimiento,
  //   }
  // };
  const [acompa, setAcompa] = useState({
    idDepartamento: 1,
    fechaInicio: new Date(),
    fechaTermino: new Date(),
    acompa: {
      nombre: "",
      segnombre: "",
      apellidop: "",
      apellidom: "",
      rut: "",
      fechanacimiento: "",
    },
  });
  const [TempAcompa, setTempAcompa] = useState({
    nombre: "",
    segnombre: "",
    apellidop: "",
    apellidom: "",
    rut: "",
    fechanacimiento: new Date()
  })
  const [acompas, setAcompas] = useState([]);
  const setState = async (k, v, i) => {
    console.log(`k=${k} ,v=${v.target.value} ,i=${i} ,`)
    const { value } = v.target;
    // let temporal = acompas[i];
    const temporal = { ...TempAcompa, [v.target.id]: value };
    console.log('temporal => ', temporal)
    setTempAcompa(temporal)
    let temporalAcompas = acompas;
    temporalAcompas[i] = TempAcompa;
    setTimeout(() => {
      setAcompas(temporalAcompas)
      console.log(temporalAcompas)
    }, 300);


    // setTempAcompa(acompas[i]);



    // setAcompa({ ...TempAcompa, k: v })
    // setAcompas[i] = TempAcompa;
    // setAcompa({k:v});
  }

  const registerReserva = () => {
    console.log(acompas)
    let payload = {
      idReserva:1,
      idDepartamento: 1,
      fechaInicio: new Date().toISOString(),
      fechaTermino: new Date().toISOString(),
      acompa: acompas
    }
    console.log(payload)
    const jpayload = JSON.stringify(payload);
    console.log('jpayload => ', jpayload)
    const Api = "https://webapiturismoreal.azurewebsites.net/api/Reserva"
    let url = Api
    axios.post(
      url,
      payload
      ,{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log("Registrado correctamente");
      // navigateTo('/Login')
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
    // axios({
    //   method: 'post',
    //   url: url,
    //   headers: {
    //     'Authorization': 'Bearer ' + token,
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     ...payload
    //   },
    // })
    //   .then(response => {
    //     console.log("Registrado correctamente");
    //     // navigateTo('/Login')
    //   }).catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //       console.log("Valores ingresados incorrectamente, intente nuevamente");
    //     } else if (error.request) {
    //       console.log("Falla en el servidor");
    //     } else {
    //       console.log(error);
    //     }
    //   });
  }
  const renderMulti = (cantidad) => {
    const arrayForm = []
    for (let index = 0; index < cantidad; index++) {
      arrayForm.push(
        <Formulario
          idx={index}
          setData={(k, v, i) => setState(k, v, i)}
          data={TempAcompa}
        />)
    }
    return arrayForm
  }

  const handleChangeCount = (v) => {
    setCount(v);
    let tempAcompas = acompas;
    tempAcompas.push({
      nombre: "",
      segnombre: "",
      apellidop: "",
      apellidom: "",
      rut: "",
      fechanacimiento: "",
    })
    setAcompas([...tempAcompas])
  }
  const [detalleCliente, setDetalleCliente] = useState([]);
  const [filtrados, useFiltrados] = useState([]);
  const peticionGet2 = async () => {
    const res = await axios.get(Url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => { return res }).catch(error => {
        console.log(error);
      })
    return res.data
  }
  const filterarray = async (peticionGet, id) => {
    const res = await peticionGet2();
    const filtrados = setDetalleCliente(res);
    // const filtrado = peticionGet.filter(function (obj) {
    // return obj.id == id;
    // });
    return filtrados;
    // return filtrado[0];
  };
  const peticionGet = () => {
    const respuesta = axios.get(baseUrl)
      .then((respuesta) => {
        return respuesta.data
      })
      .catch(error => {
        console.log(error);
      })
    return respuesta
  }

  const filt2 = (peticionGet, id) => {
    const iddepartamento = detalleDepto.serviciosExtra?.filter((serviciosExtra) => serviciosExtra.id)
    const servicios = iddepartamento?.map(usuario2 => {
      return (
        <div className='detalle-direccion'>
          <p>{usuario2.descripcion}</p>
        </div>
      )
    })
    return servicios
  }

  useEffect(() => {
    const nick = async () => {
      const respuesta = await peticionGet()
      const res = await peticionGet2();
      const filtrados = filterarray(res, id);
      setDetalleDepto({ ...respuesta });
      setDetalleCliente({ ...filtrados });
    }
    nick();



  }, [id])

  return (

    <div className="reserva-de-departamento-pag">
      <h2 className='titulo'>Reservar Departamento</h2>
      <div className='division-pagina-reserva'>
        <div className="detalle-cliente-reserva">
          <p>Datos del Cliente: {detalleCliente.nombre} {detalleCliente.segnombre} {detalleCliente.apellidop} {detalleCliente.apellidom}</p>
          <p>Departamento a Reservar: {detalleDepto.calle} {detalleDepto.numero} -  Piso n° {detalleDepto.piso}  </p>
          <label className="texto1">Servicios Extras:</label>
          <div className='detalle-direccion-3'>
            {filt2()}
          </div>
          <div className='division-pagina-reserva'>
            <label className="texto1">Cantidad de acompañantes:</label>
            <input type="number" min="0" defaultValue={0} onChange={(e) => handleChangeCount(e.target.value)} />
          </div>

          {
            acompas.length > 0 && acompas.map((a, i) => (
              <Formulario
                idx={i}
                setData={(k, v, i) => setState(k, v, i)}
                data={TempAcompa}
              />
            ))
          }
        </div>
        <div className='dat'>
          <label className="texto1">Fecha de Inicio:</label>
          <input className="calendario" type="date" name="fechaInicio" id="fechaInicio" />
          <label className="texto1">Fecha de Termino:</label>
          <input className="calendario" type="date" name="fechaTermino" id="fechaTermino" />
          <button className="boton-negro" type="submit" onClick={registerReserva}> Reservar </button>
        </div>
      </div>
    </div>
  );
};
