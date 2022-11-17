import React from 'react'
export const ClienteCard = ({id,nombre,segnombre,apellidop,apellidom,correoe,contraseña,fechanacimiento,rut,telefono}) => {

  return (
    <>

    <div className="card col-4 cartaDepto">
            <div className="card-body">
                <h5 className="card-title">{ nombre } {segnombre}</h5>
                <h5 className="card-title">{ apellidop } {apellidom}</h5>
                <h5 className="card-title">{ correoe }</h5>
                <h5 className="card-title">{ fechanacimiento }</h5>
                <h5 className="card-title">{ rut }</h5>
                <small className="card-categoria">{ telefono }</small>
            </div>
        </div>
    </>
  )
}