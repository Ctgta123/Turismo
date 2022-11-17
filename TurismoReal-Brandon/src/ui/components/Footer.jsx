import React from "react";
import { FaFacebookMessenger,FaTwitter,FaWhatsapp,FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer>
        <div>
            <div className="footer-properties">       
                <div className="footer-division">
                    <div className="footer-division-izq">
                        <h5 className="footer-division-title">Turismo Real</h5>
                        <div>
                            <p>Porque nos importa que puedas usar tu tiempo como realmente quieres.</p>
                            <p>Tenemos personal trabajando en cada uno de nuestros departamentos para solucionar toda necesidad que tengas.</p>
                            <p className="copyright">© 2022 Todos los derechos reservados</p>
                        </div>
                    </div>
                </div>
                <div className="footer-division">
                    <div className="footer-division-der">
                        <div>
                            <h5 className="footer-division-title">¿Necesitas Algo?</h5>
                            <p>Queremos que tu única preocupación sea disfrutar tu estadía.</p>
                            <p>Contáctanos a través de nuestras redes sociales:</p>
                            <div className="footer-logos">
                                <FaFacebookMessenger className="facebook" />
                                <FaTwitter className="twitter" />
                                <FaWhatsapp className="whatsapp"/>
                                <FaInstagram className="instagram" />
                            </div>
                                                        
                        </div>
                    </div>

                </div>
                
            </div>
            
        </div>
    </footer>
  )
}
