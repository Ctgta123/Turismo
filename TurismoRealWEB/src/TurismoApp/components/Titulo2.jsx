import React from 'react'
import { FcMoneyTransfer, FcAssistant, FcConferenceCall} from "react-icons/fc";

const Titulo2 = () => 
        <div className='icohome'>
          <section className="u-align-right u-clearfix u-image u-section-1" id="carousel_b2d5">
          <div className="Titulo-sección">
          <h1 className="u-custom-font u-font-roboto-slab u-text u-text-body-alt-color u-text-1">¿Por qué nos eligen?</h1>
          </div>

          <div className='motivos-eleccion'>
            <div className="icon">
            <FcMoneyTransfer className='icon-size' />
            <FcAssistant className='icon-size' />
            <FcConferenceCall className='icon-size' />
            </div>

            <div className="motivos-eleccion-texto">
            <h3>Mejores Precios</h3>
            <h3>Servicios 24/7</h3>
            <h3>Empleados Bien Calificados</h3>
            </div>
          </div>
          </section>
        </div>
export default Titulo2    