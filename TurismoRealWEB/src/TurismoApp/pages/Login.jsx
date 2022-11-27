import {useState,} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {Login as LoginStore} from "../../Store/userStore"
import Swal from 'sweetalert2'

//libreria
import axios from 'axios';
import {Apiurl} from '../services/apirest';
import { Link , useNavigate } from "react-router-dom";

export const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const [data, setData] = useState({
 
    email: "",
    password: "",

   
  })
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const manejadorBoton=(e)=>{
    let url = Apiurl;
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password
    };
    axios({
      method: 'post',
      url: url,
      data: {
        email: data.email.toLowerCase(),
        password: data.password,
        role: 3
      },
      header:{
        'content-type':'application/json'
      }
    },userData)
    .then( response =>{
      if(response.status === 200){
        localStorage.setItem("token",response.data)
        dispatch(LoginStore(response.data))
        navigateTo('/index')
      }else{
          setData({
          error:false,
          errorMsg:"Error, intente nuevamente!"
      })}
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        Swal.fire(
          'Correo o Contraseña Erronea','Intente Nuevamente', 'error'
        )
        console.log("Valores ingresados incorrectamente, intente nuevamente");
      } else if (error.request) {
        console.log("Falla en el servidor");
      } else {
        console.log(error);
      }
    });
};
    return(
      
      <div className="formulario-centro">
        <div className="wrapper">
          <div>
            <div className="titulo-formulario">
              <h3>¡Bienvenido de vuelta!</h3>
            </div>
            <form onSubmit={manejadorBoton}>
              <input type="text"name="email" placeholder="Correo Electrónico" onChange={handleChange}/>
              <input type="password" name="password" placeholder="Contraseña" onChange={handleChange}/>
              <input type="submit" value="Iniciar Sesión" onClick={manejadorBoton}/>
            </form>
            <div id="formFooter">
              <Link to="/Registro" style={{textDecoration:'none', color:'white'}}>No posees cuenta? ¡Registrate aquí!</Link>
            </div>
            <div id="formFooter">
            <Link to="/Rcontraseña" style={{textDecoration:'none', color:'white'}}>¿Olvidaste tu Contraseña?</Link>
            </div> 
          </div>
        </div>
      </div>
    )
  }

export default Login