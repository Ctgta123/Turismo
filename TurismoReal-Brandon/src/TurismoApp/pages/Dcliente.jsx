import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
//libreria
import axios from 'axios';
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const Dcliente = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil"
  const Apiurl3 = "https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil";
  const [detalleCliente, setDetalleCliente] = useState([]);
  const [filtrado, useFiltrado] = useState([]);
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token")
  const tokenredux = useSelector(dataUser)
  const [data, setData] = useState({

    nombre: '',
    segnombre:'',
    apellidop: '',
    apellidom: '',
    rut: '',
    fechanacimiento: "",
    correoe: '',
    contrasena: '',
    telefono: '',
    estado: "T"
  })
  const peticionGet2=async()=>{
    const respuesta = await axios.get(baseUrl,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })
    .then((res)=>{return res}).catch(error=>{
        console.log(error);
    })
    return respuesta.data
  }
  const filterarray =async (id) => {
    const res = await peticionGet2();
    const filtrado = setDetalleCliente(res);
    return filtrado;
  };
  const handleChange2 = (e) => {
    const value = e.target.value;
    setData({
      ...detalleCliente,
      [e.target.name]: value
    });
  };

  const registrarBoton=(e)=>{
    let url = Apiurl3;
    e.preventDefault();
    const userData = {
      nombre:  data.nombre,
      segnombre: data.segnombre,
      apellidop:  data.apellidop,
      apellidom:  data.apellidom,
      rut:  data.rut,
      fechanacimiento: data.fechanacimiento,
      correoe:  data.correoe,
      contrasena:  data.contrasena,
      telefono:  data.telefono,
      estado: data.estado

    };
    const config = {
      header:{'Authorization': 'Bearer ' + token}
    };
    const bodyParameters = {
      ...data
     };
    axios.put( 
      baseUrl,
      bodyParameters,
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
      ).then( response =>{
        console.log("Usuario Editado Correctamente"); 
    }).catch((error) => {
      if (error.response) {
        console.log("Valores ingresados incorrectamente, intente nuevamente");
      } else if (error.request) {
        console.log("Falla en el servidor");
      } else {
        console.log(error);
      }
    });
};

useEffect(()=>{
    const nick=async()=>{
     const res = await peticionGet2();
     const filtrado = filterarray(res,id);
     setDetalleCliente({...filtrado});
   } 
   nick();
 },[id])
    return <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
              <span className="font-weight-bold">{detalleCliente.nombre} {detalleCliente.apellidop}</span>
              <span className="text-black-50">{detalleCliente.correoe}</span>
              <div className="container">
                  <div className="card2">
                    <div className="header">
                      <h3>Menu Cliente <i class="fas fa-angle-down iconM"></i></h3>
                      
                    </div>
                    <div className="body">
                      <ul>
                      <Link  to="/dashboard" style={{textDecoration: 'none'}}><li><i className="fas fa-home icon"></i>Mi Perfil</li></Link>
                      <Link  to="/MisReservas" style={{textDecoration: 'none'}}><li><i className="fas fa-home icon"></i>Mis Reservas</li></Link>
                      </ul>
                    </div>
                  </div>
              </div>
          </div>
      </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Editar Perfil</h4>
                </div>
                <div className="row mt-2">
              <div className="col-md-6">
                      <label className="labels">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            id="nombre"
                            placeholder={detalleCliente.nombre}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Segundo Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="segnombre"
                            id="segnombre"
                            placeholder={detalleCliente.segnombre}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Apellido Paterno</label>
                        <input
                            type="text"
                            className="form-control"
                            name="apellidop"
                            id="apellidop"
                            placeholder={detalleCliente.apellidop}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Apellido Materno</label>
                        <input
                            type="text"
                            className="form-control"
                            name="apellidom"
                            id="apellidom"
                            placeholder={detalleCliente.apellidom}
                            onChange={handleChange2}
                        />
                    </div>
                </div>
                    <div className="col-md-12">
                        <label className="labels">RUT</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rut"
                            id="rut"
                            placeholder={detalleCliente.rut}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Fecha de Nacimiento</label>
                      <input
                          type="date"
                          className="form-control"
                          name="fechanacimiento"
                          id="fechanacimiento"
                          placeholder={detalleCliente.fechanacimiento}
                          onChange={handleChange2}
                      />
                  </div>
                    <div className="col-md-12">
                        <label className="labels">Correo Electronico</label>
                        <input
                            type="text"
                            className="form-control"
                            name="correoe"
                            id="correoe"
                            placeholder={detalleCliente.correoe}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Modificar Contraseña</label>
                        <input
                            type="text"
                            className="form-control"
                            name="contrasena"
                            id="contrasena"
                            placeholder=""
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Numero Telefonico</label>
                        <input
                            type="text"
                            className="form-control"
                            name="telefono"
                            id="telefono"
                            placeholder={detalleCliente.telefono}
                            onChange={handleChange2}
                        />
                    </div>
                      <div className="button">
                        <input
                            type="submit" 
                            value="Editar" 
                            onClick={registrarBoton}/>
                      </div>
                    </div>
                </div>
        </div>
    </div>
</div>
  }