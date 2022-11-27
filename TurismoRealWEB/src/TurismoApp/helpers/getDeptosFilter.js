import {useState , useEffect} from "react"
import axios from "axios";
export const getDeptosFilter = (region="")=>{
    const [data, setData]=useState([]);
    const baseUrl="https://webapirestturismoreal.azurewebsites.net/api/Catalogo"
    let resultado =[];
    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    } 
    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.region.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setData(resultadosBusqueda);
      }
    if (region.length === 0) {
        resultado=data;
    }else{
        resultado = data.filter(depto => depto.region.includes(region));
    }   
    console.log(resultado)
    useEffect(()=>{
        peticionGet();
    },[])
    console.log(resultado)
    return resultado
}


