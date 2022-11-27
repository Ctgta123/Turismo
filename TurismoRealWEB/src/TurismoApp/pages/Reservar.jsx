import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { dataUser } from "../../Store/userStore";
import "react-datepicker/dist/react-datepicker.css";
import { Formulario } from "../components/Formulario";
import { Pago} from './Pago'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../Hooks/Context';
export const Reservar = () => {
    const params = useParams();   
    const id = params.id;
    const Url =
        "https://webapiturismoreal.azurewebsites.net/api/Cliente/Perfil";
    const baseUrl =
        "https://webapiturismoreal.azurewebsites.net/api/Department/Perfil/" +
        id;
    const [detalleDepto, setDetalleDepto] = useState([]);
    const [userInfo, setUserInfo] = useState({})
    const [data,setData] = useState([]);
    const navigateTo = useNavigate();
    const [detalleCliente, setDetalleCliente] = useState([]);
    const [extra,setExtra] = useState({servicioExtra:""})
    const handleChangeExtra = (e) => {
        setExtra({ ...extra, servicio: e.target.value})   
        };
    const [Fecha,setFecha] = useState({fechaInicio: "",fechaFin: ""});
    const handleDateInicio = (e) => {  
        setFecha({ ...Fecha, fechaInicio: e.target.value })
    }
    const handleDateFin = (e) => {   
        setFecha({ ...Fecha, fechaFin: e.target.value })
    }
    const [filtrados, useFiltrados] = useState([]);
    const peticionGet2 = async () => {
        const res = await axios
            .get(Url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.log(error);
            });
        return res.data;
    };
    const filterarray = async (peticionGet, id) => {
        const res = await peticionGet2();
        const filtrados = setDetalleCliente(res);
        return filtrados;
    };
    const peticionGet = () => {
        const respuesta = axios
            .get(baseUrl)
            .then((respuesta) => {
                return respuesta.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return respuesta;
    };
    useEffect(() => {
        const nick = async () => {
            const respuesta = await peticionGet();
            const res = await peticionGet2();
            const filtrados = filterarray(res, id);
            setDetalleDepto({ ...respuesta });
            setDetalleCliente({ ...filtrados });
        };
        nick();
    }, [id]);
    const token = localStorage.getItem("token");
    const tokenredux = useSelector(dataUser);
    const [count, setCount] = useState(0);
    const [acompa, setAcompa] = useState({
        idDepartamento: [id],
        idCliente:[detalleCliente.id],
        fechaInicio: new Date(),
        fechaTermino: new Date(),
        acompa: {
            nombre: "",
            segnombre: "",
            apellidop: "",
            apellidom: "",
            rut: "",
            fechanacimiento: ""
        },
        servicioExtra: []
    });
    const [TempAcompa, setTempAcompa] = useState({
        nombre: "",
        segnombre: "",
        apellidop: "",
        apellidom: "",
        rut: "",
        fechanacimiento: new Date(),
    });
    const [acompas, setAcompas] = useState([]);
    const setState = async (k, v, i) => {
        // console.log(`k=${k} ,v=${v.target.value} ,i=${i} ,`);
        const {name,value} = v.target;
        console.log("name =>",name)
        console.log("value =>",value)
        console.log("acompas[i] =>",acompas[i])
        setTempAcompa({...acompas[i],[name]:value});
        let temp = acompas;
        temp[i]={...acompas[i],[name]:value};
        setAcompas([...temp])
   
    };
    const registerReserva = () => {
        console.log(acompas);
        let payload = {
            idDepartamento: id,
            idCliente: detalleCliente.id,
            fechaInicio: Fecha.fechaInicio,
            fechaTermino: Fecha.fechaFin,
            acompa: acompas,
            servicioExtra: [extra.servicio]
        };
        console.log(payload);
        const jpayload = JSON.stringify(payload);
        console.log("jpayload => ", jpayload);
        const Api = "https://webapiturismoreal.azurewebsites.net/api/Reserva";
        let url = Api;
        axios
            .post(url, payload, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Enviado correctamente");
                console.log(response.data)
                navigateTo('/Pago/'+response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    Swal.fire(
                        'Informacion Erronea en la Reserva','Intente Nuevamente', 'error'
                      )
                    console.log(
                        "Valores ingresados incorrectamente, intente nuevamente"
                    );
                } else if (error.request) {
                    console.log("Falla en el servidor");
                } else {
                    console.log(error);
                }
            });
    };
    const renderMulti = (cantidad) => {
        const arrayForm = [];
        for (let index = 0; index < cantidad; index++) {
            arrayForm.push(
                <Formulario
                    idx={index}
                    setData={(k, v, i) => setState(k, v, i)}
                    data={TempAcompa}
                />
            );
        }
        return arrayForm;
    };
    const handleSumaAcomp = () => {
        setCount(parseInt(count) + 1);
        let tempAcompas = acompas;
        tempAcompas.push({
            nombre: "",
            segnombre: "",
            apellidop: "",
            apellidom: "",
            rut: "",
            fechanacimiento: new Date(),
        });
        setAcompas([...tempAcompas]);
    };
    const handleRestaAcomp = () => {
        let tCount = parseInt(count) <= 0 ? 0 : parseInt(count) - 1;
        setCount(tCount);
        let tempAcompas = acompas;
        tempAcompas.pop();
        setAcompas([...tempAcompas]);
    };
    const handleChangeCount = (v) => {
        if (v <= 0) {
            setAcompas([]);
            return;
        }
        setCount(v);
        let tempAcompas = acompas;
        tempAcompas.push({
            nombre: "",
            segnombre: "",
            apellidop: "",
            apellidom: "",
            rut: "",
            fechanacimiento: Date.new(),
        });
        setAcompas([...tempAcompas]);
    };

    const filt2 = (peticionGet, id) => {
        const iddepartamento = detalleDepto.serviciosExtra?.filter(
            (serviciosExtra) => serviciosExtra.id
        );
        const servicios = iddepartamento?.map((usuario2) => {
            return (
                <div className="detalle-direccion">
                    <p>{usuario2.id}. {usuario2.descripcion}</p>
                </div>
            );
        });
        return servicios;
    };
    window.onload = function () {
        document.form1("formButton").submit();
    };
    
    return (
        <div className="reserva-de-departamento-pag">
            <h2 className="titulo">Reservar Departamento</h2>
            <div className="division-pagina-reserva">
                <div className="detalle-cliente-reserva">
                    <p>
                        Datos del Cliente: {detalleCliente.nombre}{" "}
                        {detalleCliente.segnombre} {detalleCliente.apellidop}{" "}
                        {detalleCliente.apellidom}
                        
                    </p>
                    <p>
                        Departamento a Reservar: {detalleDepto.calle}{" "}
                        {detalleDepto.numero} - Piso n° {detalleDepto.piso}{" "}
                    </p>
                    <label className="texto1">Servicios Extras:</label>
                    <div className="detalle-direccion-3">{filt2()}</div>
                    <div className="division-pagina-reserva">
                        <label className="texto1">
                            Cantidad de acompañantes:
                        </label>

                        <div className="valores-acompa">
                            <button className="valores"
                                onClick={() => {
                                    handleSumaAcomp();
                                }}
                            >
                                +
                            </button>
                            <input
                                type="number"
                                value={count}
                                disabled
                                onChange={(e) =>
                                    handleChangeCount(e.target.value)
                                }
                            />
                            <button className="valores"
                                onClick={() => {
                                    handleRestaAcomp();
                                }}
                            >
                                -
                            </button>
                        </div>
                    </div>

                    {acompas.length > 0 &&
                        acompas.map((a, i) => (
                            <div className="form">
                                <h2 className="titulo-formulario2">Formulario de acompañante</h2>
                                <form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" name="form1" method="POST">
                                    
                                        <div className="nombre-usuario-acompanante">
                                            <div>
                                                <label>Nombre</label>
                                                <input
                                                    type="text"
                                                    value={a.nombre}
                                                    name="nombre"
                                                    id="nombre"
                                                    onChange={(e) =>
                                                      setState(
                                                            "nombre",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label>Segundo Nombre</label>
                                                <input
                                                    type="text"
                                                    value={a.segnombre}
                                                    name="segnombre"
                                                    id="segnombre"
                                                    onChange={(e) =>
                                                        setState(
                                                            "segnombre",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label>Apellido Paterno</label>
                                                <input
                                                    type="text"
                                                    value={a.apellidop}
                                                    name="apellidop"
                                                    id="apellidop"
                                                    onChange={(e) =>
                                                        setState(
                                                            "apellidop",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label>Apellido Materno</label>
                                                <input
                                                    type="text"
                                                    value={a.apellidom}
                                                    name="apellidom"
                                                    id="apellidom"
                                                    onChange={(e) =>
                                                        setState(
                                                            "apellidom",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="nombre-usuario-acompanante">
                                            <div>
                                                <label>Rut: </label>
                                                <input
                                                    type="text"
                                                    value={a.rut}
                                                    name="rut"
                                                    id="rut"
                                                    onChange={(e) =>
                                                        setState(
                                                            "rut",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="form-control-3">
                                                <label>
                                                    Fecha de Nacimiento:{" "}
                                                </label>
                                                <input
                                                    className="form-control-2"
                                                    value={
                                                        a.fechanacimiento
                                                    }
                                                    type="date"
                                                    min="1975-01-01"
                                                    max="2015-12-31"
                                                    name="fechanacimiento"
                                                    id="fechanacimiento"
                                                    onChange={(e) =>
                                                        setState(
                                                            "fechanacimiento",
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                 
                                </form>
                            </div>
                       
                        ))}
                </div>
                
                <div className="dat">

                    <h2 className="valord">Valor por dia ${detalleDepto.precio}</h2>
                    <hr></hr>
                    <div className="centrar-calendario-label">
                        <label className="texto1">Fecha de Inicio: </label>
                        <input className="calendario" type="date" name="fechaInicio" id="fechaInicio" onChange={handleDateInicio} />
                    </div>
                    <div className="centrar-calendario-label">
                        <label className="texto1">Fecha de Termino: </label>
                        <input className="calendario" type="date" name="fechaTermino" id="fechaTermino" onChange={handleDateFin}/>
                    </div>
                    <div className="centrar-calendario-label">
                        <label className="texto1">N° Servicio extra </label>
                        <input type="number" name="servicioExtra" id="servicioExtra" onChange={handleChangeExtra}/>
                    </div>
                    <script type="text/javascript"/>
                    <button className="boton-negro" type="submit" id="formButton" onClick={registerReserva }>{" "}Reservar{" "}</button>
                </div>
            </div>
        </div>
    );
};