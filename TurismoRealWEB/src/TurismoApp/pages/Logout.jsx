import { useDispatch } from 'react-redux'
import {Login} from "../../Store/userStore"
import { Link } from "react-router-dom";

export const Logout = () => {

    const dispatch = useDispatch()
    localStorage.setItem("token","")
    dispatch(Login(null))
  return <div> 
      <div className="formulario-centro">
        <div className="wrapper2">
          <div>
            <h2>Se ha cerrado su sesión, muchas gracias por preferirnos!</h2>
            <hr />
              <Link  to="/home" style={{textDecoration:'none', color:'black'}}>Presione aquí para volver al inicio</Link>

          </div>
        </div>
      </div>
      </div>
}
