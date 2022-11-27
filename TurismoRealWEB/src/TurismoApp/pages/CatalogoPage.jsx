import { useState, useEffect } from "react";
import axios from "axios";
import { DeptosCard } from "../components/DeptosCard";

export const CatalogoPage = () => {
  const [data, setData] = useState([]);
  const [tablaDeptos, setTablaDeptos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Catalogo"
  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
        setData(response.data);
        setTablaDeptos(response.data);
    }).catch(error=>{
        console.log(error);
    })
  }
const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}
const replaceSpecialChars = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
}
const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaDeptos.filter((elemento)=>{
    if(replaceSpecialChars(elemento.region.toString().toLowerCase()).includes(replaceSpecialChars(terminoBusqueda.toLowerCase()))
    ){
      return elemento;
    }
  });
  setData(resultadosBusqueda);
}
useEffect(()=>{
  peticionGet()
},[])
  return (
    <>
       <div className="container">
         <div className="row">
           <div className="col-12 titulo">
             <h1>Catálogo de departamentos</h1>
           </div>
           <div className="col-3 filtro">
             <div><h5>Busca departamentos por región: </h5></div>
                <div className="containerInput">
                  <input className="container-search" value={busqueda} placeholder="Regiones de Chile"  onChange={handleChange}/>
                </div>
           </div>
           <div className="col-9">
           <span className="icon"><i className="fa fa-search"></i></span><font></font>
             <div className="row rows-cols-1 row-cols-md-3 g-3 contenedorCard">
               {data && data.map((deptos) => (
                 <DeptosCard key={deptos.id} {...deptos}> </DeptosCard>
               ))}
             </div>
           </div>
         </div>
       </div>
     </>
    )
  };
  export default CatalogoPage;