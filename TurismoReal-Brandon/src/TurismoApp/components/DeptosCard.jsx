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
                <p className="card-text">{ calle } { numero } </p>
                <span>Precio por día: { precio }</span>
            </div>
            <article key={id}>
            <div className="card-footer">
              <Link  to={`/DeptoPage/${id}`}>Reservar</Link>
            </div>
            </article>
        </div>
    </>
  )
}
export default DeptosCard;