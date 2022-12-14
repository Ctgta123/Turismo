import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
//libreria
import axios from 'axios';
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const MisReservas = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil"
  const url="https://webapiturismoreal.azurewebsites.net/api/Reserva"
  const [detalleCliente, setDetalleCliente] = useState([]);
  const [detalleReserva, setDetalleReserva] = useState([]);
  const [filtrado, useFiltrado] = useState([]);
  const [filtrado2, useFiltrado2] = useState([]);
  const token = localStorage.getItem("token")
  const tokenredux = useSelector(dataUser)
  const [data, setData] = useState({
  })

  const peticionGet2=async()=>{
    const respuesta2 = await axios.get(url,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })
    .then((res2)=>{return res2}).catch(error=>{
        console.log(error);
    })
    return respuesta2.data
  }
  const filterarray2 =async (id) => {
    const res2 = await peticionGet2();
    const filtrado2 = setDetalleReserva(res2);
    return filtrado2;
  };
  const convertDate = (date) => {
    let newDate = new Date(date);
    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    let yyyy = newDate.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  convertDate('2022-11-16T00:00:00')

  const peticionGet=async()=>{
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
    const res = await peticionGet();
    const filtrado = setDetalleCliente(res);
    return filtrado;
  };
   
function useDatos() {
    const [depto, setDepto] = useState([])
   
    useEffect(() => {
      peticionGet2()
        .then(datos => {
         setDepto(datos)
        })
    }, [])
   
    return depto
  }
  const depto = useDatos()
useEffect(()=>{
    const nick=async()=>{
     const res = await peticionGet();
     const filtrado = filterarray(res,id);
     setDetalleCliente({...filtrado});
   } 
   nick();

  
 },[id])
    return <div class="container">
    <div class="row">
      <div class="col">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                      className="rounded-circle mt-5"
                      width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                <span className="font-weight-bold">{detalleCliente.nombre} {detalleCliente.apellidop}</span>
                <span className="text-black-50">{detalleCliente.correoe}</span>
                <div className="container">
                    <div className="card3">
                      <div className="heade3">
                        <h3>Menu Cliente <i class="fas fa-angle-down iconM"></i></h3>
                        <hr ></hr>
                      </div>
                      <div className="body">
                        <ul>
                        <Link  to="/Dcliente" style={{textDecoration: 'none'}}><li><i className="fas fa-home icon"></i>Editar Usuario</li></Link>
                          <Link  to="/dashboard" style={{textDecoration: 'none'}}><li><i className="fas fa-home icon"></i>Mi Perfil</li></Link>
                        </ul>
                      </div>
                    </div>
                    </div>
                    </div>
      </div>
      <div class="col">
       <div className="tabla1 container mt-5" align="center">
                  <h2>Lista de Reservas</h2>
                  <div className="row">
                      <div className="col-md-12">
                      <table className="tabla table table-bordered">
                          <thead className="thead-dark">
                  <tr>
                  <th scope="col">Direccion</th>
                  <th scope="col">Piso</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Monto Cancelado</th>
                  <th scope="col">Fecha de Inicio</th>
                  <th scope="col">Fecha de Termino</th>
                  </tr>
                  </thead> 
                  <tbody>
              {depto.map(detalleReserva => (
                <tr key={detalleReserva.id}>
                  <td>{detalleReserva.calle} {detalleReserva.nmro}</td>
                  <td>{detalleReserva.piso}</td>
                  <td>${detalleReserva.costo}</td>
                  <td>{detalleReserva.adelanto}</td>
                  <td>{convertDate(detalleReserva.fechainicio)}</td>
                  <td>{convertDate(detalleReserva.fechatermino)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>     
        </div>
      </div>
    </div>
  </div>
      
  }
  export default MisReservas