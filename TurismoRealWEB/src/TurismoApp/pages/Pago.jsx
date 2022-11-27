import {useState,useEffect} from 'react';
import axios from 'axios';
import { dataUser } from "../../Store/userStore";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
export const Pago = () => {
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const tokenredux = useSelector(dataUser);
  const [detallePago, setDetallePago] = useState([])
  const baseUrl ="https://webapiturismoreal.azurewebsites.net/api/Reserva/GenerarPago?reserva="+id;
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
    const filtrado = setDetallePago(res);
    return filtrado;
  };

  const [pago, setPago] = useState({  
   total: detallePago.costoDepTotal,
   porcentajeAde: "",
   idServ: [detallePago.costoServ]
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setPago({
      ...pago,
      [e.target.name]: value
    });
  };
  const RealizarPago = () => {
    let payload = {
      total: total,
      porcentajeAde: pago.porcentajeAde,
      idServ: [detallePago.costoServ]
    };
    
    



    console.log(payload);
    const jpayload = JSON.stringify(payload);
    console.log("jpayload => ", jpayload);
    const Api = "https://webapiturismoreal.azurewebsites.net/api/Pago";
    let url = Api;
    axios
        .post(url, payload, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("Enviado correctamente");
            console.log(response.data)
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(
                    "Valores ingresados incorrectamente, intente nuevamente"
                );
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
     setDetallePago({...filtrado});
   }
   nick();
   
 },[id])
  const total = [detallePago.costoDepTotal + detallePago.costoServ]
  const totalmin = [total/2]
  if (totalmin <= total*0.5) {
    Swal.fire(
      'Ingrese un valor superior al Monto Minimo','Intente Nuevamente', 'error'
    )
  } else {
    Swal.fire(
      'Se Redireccionara a TransBank','Para Continuar el pago', 'success'
    )
  }


  return<>
  <div> 

      <div className="formulario-centro">

        <div className="wrapper">
        <h1>Pago a Realizar</h1>
          <div>
            <div className="titulo-formulario">
            
            </div>
            <form>
              <h3>¿Desea Hacer un pago adelantado?</h3>
              <div className='pagos'>
                <h5>Monto minimo a Ingresar: ${totalmin} </h5>
                </div>
                <input type="number" placeholder='Ingrese Monto a Pagar $' />
              <input type="submit" value="Realizar Pago" />
              <h3>¿Realizar Pago completo?</h3>
                <div className='pagos'>
                <h5>Monto total: ${total}  </h5>
                </div>
              <input type="submit" value="Realizar Pago" />
            </form>
            </div> 
          </div>
        </div>
      </div>
              

            
      </> 
}

export default Pago;