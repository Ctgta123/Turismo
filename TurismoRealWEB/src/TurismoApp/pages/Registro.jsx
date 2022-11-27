  import {useState,useRef} from "react";
  import emailjs from '@emailjs/browser'; 
  import Swal from 'sweetalert2'
  //libreria
  import axios from 'axios';
  import { useSelector } from 'react-redux';
  import {dataUser} from '../../Store/userStore';
  import { Link, useNavigate } from "react-router-dom";

  export const Registro = () => {
    const Api = "https://webapiturismoreal.azurewebsites.net/api/Cliente"
    const navigateTo = useNavigate();
    const form = useRef();
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
      telefono: ''
    })
    const handleChange2 = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
    };
    
    const registrarBoton=(e)=>{
      let url = Api
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
        telefono:  data.telefono
      };
      axios({
        method: 'post',
        url: url,
        data:{
          nombre:  data.nombre,
          segnombre: data.segnombre,
          apellidop:  data.apellidop,
          apellidom:  data.apellidom,
          rut:  data.rut,
          fechanacimiento: data.fechanacimiento,
          correoe:  data.correoe,
          contrasena:  data.contrasena,
          telefono:  data.telefono,
        },
    })
      .then( response =>{
          console.log("Registrado correctamente"); 
          navigateTo('/Login')
          Swal.fire(
            'Se a Registrado Correctamente','Bienvenido a Turismo Real', 'success'
          )
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          Swal.fire(
            'Ingrese Datos Correctamente','Intente Nuevamente', 'error'
          )
          console.log("Valores ingresados incorrectamente, intente nuevamente");
        } else if (error.request) {
          console.log("Falla en el servidor");
        } else {
          console.log(error);
        }
      });
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xgfg68b', 'template_wd8ccat', form.current, 'yMEBb11hBmN7xhqjD')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
      return(
      <>
        <div className="centralizar" >
        <div className="container">
      <div className="title">Registro de Usuario</div>
      <div className="content">
        <form action="#" ref={form} onSubmit={sendEmail}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Nombre</span>
              <input type="text" name="nombre" id="nombre" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Segundo Nombre</span>
              <input type="text" name="segnombre" id="segnombre" placeholder="(Campo opcional)" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Apellido Paterno</span>
              <input type="text" name="apellidop" id="apellidop"  onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Apellido Materno</span>
              <input type="text" name="apellidom" id="apellidom" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">RUT</span>
              <input type="text" name="rut" id="rut" placeholder="Formato: XX.XXX.XXX-X" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Fecha de Nacimiento</span>
              <input type="date" name="fechanacimiento" id="fechanacimiento" min="1975-01-01" max="2005-12-31" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" name="correoe" id="correoe" placeholder="Ingrese su Correo Electrónico" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Contraseña</span>
              <input type="password" name="contrasena" id="contrasena" placeholder="Ingrese Contraseña" onChange={handleChange2}/>
            </div>
            <div className="input-box">
              <span className="details">Numero Telefonico</span>
              <input type="text" name="telefono" id="telefono" placeholder="Ingrese Número Telefónico" onChange={handleChange2}/>
            </div>
              <div className="button">
              <input type="submit" value="Registrar" onClick={registrarBoton}/>
              <Link to="/Login">¿Ya estas registrado?</Link>
              </div>
            </div>
        </form>
      </div>
    </div>
        </div>
       </>
      )
    };
  
  