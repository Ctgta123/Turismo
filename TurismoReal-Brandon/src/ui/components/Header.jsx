import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {dataUser} from '../../Store/userStore';



export const Header = () => {
    const token = localStorage.getItem("token")
    const tokenredux = useSelector(dataUser)
    return (
                <nav className="navbar navbar-expand-sm menu">
                    <div className="posicion-header">
                    <Link to="/home">
                        
                            <img className="icono-principal"  src="https://i.ibb.co/sQPBMZ0/Logo.png"/>
                        </Link>
                    <div className="navbar-collapse menuNavbar">
                        
                        <div className="navbar-nav">
                        {
                            tokenredux === null ?<NavLink  className="nav-item nav-link navColor" to="/Home">Inicio</NavLink>:<NavLink  className="nav-item nav-link navColor" to="/index">Inicio</NavLink>    
                           }  
                            <NavLink className={ ({isActive}) => `nav-item nav-link navColor ${ isActive ? 'active':'' }` } to="/catalogo">Catálogo</NavLink>
                           {
                            tokenredux === null ?<NavLink></NavLink>:<NavLink  className="nav-item nav-link navColor" to="/Dashboard">Mi perfil</NavLink>    
                           }  
                          
                          {
                            tokenredux === null ?<NavLink  className="nav-item nav-link navColor" to="/Login">Iniciar Sesión</NavLink>:<NavLink  className="nav-item nav-link navColor" to="/Logout">Cerrar Sesion</NavLink>
                           } 
                        </div>
                    </div>
                    </div>
                </nav>
    )
}