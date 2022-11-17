import { useState, useEffect } from "react";
import axios from "axios";
import { DeptosCard } from "../components/DeptosCard";


export const Titulo = () => {
const [data, setData] = useState([]);
const [ currentPage, setCurrentPage ] = useState(0)
const [tablaDeptos, setTablaDeptos] = useState([]);
const baseUrl="https://webapiturismoreal.azurewebsites.net/api/Catalogo"


const peticionGet=async()=>{
  await axios.get(baseUrl)
  .then(response=>{
      const limit = 3;
      setData(response.data.slice(0, limit));
  }).catch(error=>{
      console.log(error);
  })
}

useEffect(()=>{
peticionGet();
},[])
return (
      <>

        <div>
          <section>
          <div className="Titulo-sección">
              <h1 >Selecciona uno de nuestros departamentos</h1>
              <div className="Catalogo-pag-principal">
              {data && data.map((deptos) => (
                 <DeptosCard key={deptos.id} {...deptos}></DeptosCard>
               ))}
              </div>
              </div>

          </section>
        </div>
      </>
   )
  };

  export default Titulo 