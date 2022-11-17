import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';
import { useParams } from 'react-router-dom';

export const Dashboard = () => {
  const params = useParams();
  const id = params.id;
  const [detalleCliente, setDetalleCliente] = useState([]);
  const [filtrado, useFiltrado] = useState([]);
  const token = localStorage.getItem("token")
  const tokenredux = useSelector(dataUser)
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil"
  const peticionGet2=async()=>{
    const res = await axios.get(baseUrl,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })
    .then((res)=>{return res}).catch(error=>{
        console.log(error);
    })
    return res.data
  }
  const filterarray =async (id) => {
    const res = await peticionGet2();
    const filtrado = setDetalleCliente(res);
    return filtrado;
  };


 
  useEffect(()=>{
     const nick=async()=>{
      // const respuesta = await peticionGet2()
      // console.log(respuesta)
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
                  <div className="card">
                    <div className="header">
                      <h3>Menu Cliente <i class="fas fa-angle-down iconM"></i></h3>
                    </div>
                    <div className="body">
                      <ul>
                      <Link  to="/Dcliente" style={{textDecoration: 'none'}}><li><i className="fas fa-home icon"></i>Editar Usuario</li></Link>
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
                  <h4 className="text-right">Perfil de usuario</h4>
              </div>
              <div className="row mt-2">
              <div className="col-md-6">
                      <label className="labels">Nombre</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.nombre}
                          disabled
                      />
                  </div>
                    <div className="col-md-6">
                      <label className="labels">Segundo Nombre</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.segnombre}
                          disabled
                      />
                  </div>
                  </div>
              <div className="row mt-2">
              <div className="col-md-6">
                      <label className="labels">Apellido Paterno</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.apellidop}
                          disabled
                      />
                  </div>
                    <div className="col-md-6">
                      <label className="labels">Apellido Materno</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.apellidom}
                          disabled
                      />
                  </div>
                  <div className="col-md-12">
                      <label className="labels">RUT</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.rut}
                          disabled
                      />
                  </div>
                  <div className="col-md-12">
                      <label className="labels">Fecha de Nacimiento</label>
                      <input
                          
                          className="form-control"
                          placeholder={detalleCliente.fechanacimiento}
                          disabled
                      />
                  </div>
                  <div className="col-md-12">
                      <label className="labels">Correo Electrónico</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.correoe}
                          disabled
                      />
                  </div>
                  <div className="col-md-12">
                      <label className="labels">Número Telefónico</label>
                      <input
                          className="form-control"
                          placeholder={detalleCliente.telefono}
                          disabled

                      />
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>



}
