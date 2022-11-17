import Carousel from 'react-bootstrap/Carousel';
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';
export const DeptoPage = () => {
  const [detalleDepto, setDetalleDepto] = useState([]);
  const params=useParams();
  const id=params.id
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Department/Perfil/"+id
  const peticionGet=()=>{
     const respuesta = axios.get(baseUrl)
    .then((respuesta)=>{
      return respuesta.data
    })
    .catch(error=>{
        console.log(error);
    })
    return respuesta
  }
  useEffect(()=>{
     const nick=async()=>{
      const respuesta = await peticionGet()
      // const filtrado = filterarray(respuesta,id);
      setDetalleDepto({ ...respuesta });
      // console.log(detalleDepto.imagen[0])
    }
    nick();
  },[id])
    const token = localStorage.getItem("token")
    const tokenredux = useSelector(dataUser)

    const filt1 = (peticionGet,id) =>{
      const iddepartamento = detalleDepto.caracteristica?.filter((caracteristica) => caracteristica.id )
      const caracteristicas = iddepartamento?.map(usuario => {return (
      <div className='detalle-cara' key={usuario.id}>
      <img src={"https://multimediaturismo.blob.core.windows.net/img/"+usuario.diricono} alt="First slide"/>
      <p >{usuario.nombre}</p>
     </div>
      )} )
      return caracteristicas
      
    }

    const filt2 = (peticionGet,id) =>{
      const iddepartamento = detalleDepto.serviciosExtra?.filter((serviciosExtra) => serviciosExtra.id )
      const servicios = iddepartamento?.map(usuario2=> {return(
        <div className='detalle-direccion'>
          <p>{usuario2.descripcion}</p>
          <p>Valor: {usuario2.costo}</p>
      </div>
      )})
      return servicios
    }
   
    
    const filterarray = (peticionGet, id) => {
      const prioridad = detalleDepto.imagen?.filter((imagen) => imagen.prioridad === 2)
      const imagenes = prioridad?.map(imagenes=> {return((
        <Carousel.Item>
        <img  className="img" src={"https://multimediaturismo.blob.core.windows.net/img/"+imagenes.directorio} alt="First slide"/>
      </Carousel.Item>
      ))} )  
    return imagenes
    }
    filterarray()
    return (
      <div className='contenedor-detalle-departamento'>
            <div className='detalles-departamento'>
      {detalleDepto.length === 0 ? (
              "Cargando Data"
            ) : (
              <div>
                <h2 className='titulo'>Departamento en {detalleDepto.region}</h2>
                <Carousel>
                {filterarray()}
                </Carousel>
                
                <div className='detalle-direccion'>
                  <p>Dirección: {detalleDepto.calle} {detalleDepto.numero} -  Piso n° {detalleDepto.piso}  </p>   
                  <p>Metodos de pago disponibles: TransBank</p>           
                </div>
                <div className='detalle-direccion'>
                  <p>Cantidad de habitaciones: {detalleDepto.cantHabitacion} </p>
                  <p> Cantidad de baños: {detalleDepto.cantBano}</p>
                </div>
                <hr />
                <div className='detalle-direccion-2'>
                <p>Caracteristicas:  </p>
                <div className='caracteristicas-detalle-departamento'>
                {filt1()}  
                </div>
                </div>
                <hr/>
                <div  className='detalle-direccion-2'>
                <p>Servicios Extra Disponibles: </p> 
                <div  className='detalle-direccion-3'>
                {filt2()} 
                <hr/>
                </div>
                </div>
                    <div className='confirmar-reserva'>
                      <h5>Precio: ${detalleDepto.precio} por noche</h5>
                      <article>
                      <button className="Reservar">
                      {
                      tokenredux === null ?<Link  to="/Login" className="Link" style={{textDecoration: 'none'}}>Reservar</Link> : <Link  to={`/Reservar/${id}`} className="Link" style={{textDecoration: 'none'}}>Reservar</Link>
                      }
                    </button>
                    </article>
                    </div>
              </div>
            )}
            </div>
          </div>
      )}