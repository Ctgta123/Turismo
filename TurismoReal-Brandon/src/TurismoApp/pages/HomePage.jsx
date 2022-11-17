import emailjs from '@emailjs/browser'; 
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import Header from '../components/Header';
import Titulo from '../components/Titulo';
import Titulo2 from '../components/Titulo2';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';
import { useParams } from 'react-router-dom';

export const HomePage = () => {
  const params = useParams();
  const id = params.id;
  const [detalleCliente, setDetalleCliente] = useState([]);
  const [filtrado, useFiltrado] = useState([]);
  const token = localStorage.getItem("token")
  const tokenredux = useSelector(dataUser)
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil"
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xgfg68b', 'template_wd8ccat', form.current, 'yMEBb11hBmN7xhqjD')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
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
  return <div>        
     <h1 className="Bienvenida" >Bienvenido(a) {detalleCliente.nombre}</h1>      
     <ImageSlider slides={SliderData} />
     <Titulo />
     <Header />
     <Titulo2 />
      </div>
}
