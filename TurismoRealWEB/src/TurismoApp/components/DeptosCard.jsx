import React from 'react'
import { Link } from 'react-router-dom';
export const DeptosCard = ({id,region,comuna,calle,numero,piso,estado,precio,directorio}) => {

  //const props = {id,region,comuna,calle,numero,piso,estado,precio,directorio}

  return (
  <>

    <div className="card col-4 cartaDepto">
      <img className="imgCard" src={directorio} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{ region }</h5>
        <p className="card-text"> Dirección: { calle } { numero } </p>
        Precio por día: ${ precio }
      </div>

     
      <div className="card-footer" >
        <Link  to={`/DeptoPage/${id}`} style={{textDecoration: 'none', color:'white'}}>Reservar</Link>
      </div>
 

    </div>
  </>
  )
}
export default DeptosCard;