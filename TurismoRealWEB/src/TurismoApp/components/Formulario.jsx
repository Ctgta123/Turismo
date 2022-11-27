import { useState, useRef,useEffect } from "react";
import emailjs from '@emailjs/browser';
//libreria
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dataUser } from '../../Store/userStore';
import { form } from "../Hooks/form";

export const Formulario = ({...props}) => {
    const token = localStorage.getItem("token");
    const tokenredux = useSelector(dataUser);
    // const { data, handleChange } = form();
    // const setState = (k,v) => {
        
    //     setAcompa({k:v});
    // }
    // const [Acompa, setAcompa] = useState({
    //     nombre: "",
    //     segnombre: "",
    //     apellidop: "",
    //     apellidom: "",
    //     rut: "",
    //     fechanacimiento: "",
    // })
    const [DataForm, setDataForm] = useState({});
    useEffect(() => {
      setDataForm(props.data);
    }, [props.data])
    
    const handleSetData = async (k,v,i) => {
        console.log(v.target.value)
        await props.setData(k,v,i);
    }
    return <div className="form" key={props.idx}>
        <h2 className="titulo-formulario2">Formulario de acompañante</h2>
        <form>
            <div >
                <div className="nombre-usuario-acompanante">
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={DataForm.nombre} name="nombre" id="nombre" onChange={(e)=>handleSetData('nombre',e,props.idx)} />
                    </div>
                    <div>
                        <label>Segundo Nombre</label>
                        <input type="text" value={DataForm.segnombre} name="segnombre:" id="segnombre" onChange={(e)=>handleSetData('segnombre',e,props.idx)} />
                    </div>
                    <div>
                        <label>Apellido Paterno</label>
                        <input type="text" value={DataForm.apellidop} name="apellidop" id="apellidop" onChange={(e)=>handleSetData('apellidop',e,props.idx)} />
                    </div>
                    <div>
                        <label>Apellido Materno</label>
                        <input type="text" value={DataForm.apellidom} name="apellidom" id="apellidom" onChange={(e)=>handleSetData('apellidom',e,props.idx)} />
                    </div>
                </div>
                <div className="nombre-usuario-acompanante">
                    <div>
                        <label>Rut: </label>
                        <input type="text" value={DataForm.rut} name="rut" id="rut" onChange={(e)=>handleSetData('rut',e,props.idx)} />

                    </div>
                    <div className="form-control-3">
                        <label>Fecha de Nacimiento: </label>
                        <input className="form-control-2" value={DataForm.fechanacimiento} type="date" min="1975-01-01" max="2015-12-31" name="fechanacimiento" id="fechanacimiento" onChange={(e)=>handleSetData('fechanacimiento',e,props.idx)} />
                    </div>
                </div>
            </div>
        </form>
    </div>
}
export default Formulario;