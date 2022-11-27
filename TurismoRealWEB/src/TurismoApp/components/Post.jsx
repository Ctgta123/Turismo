import React from 'react';
import axios from 'axios';

const ImageSlider = () => {}
const [respuestas,setRespuestas] = useState([]);       

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
        console.log("Registrado correctamente");
        setRespuestas ( response.data)
        console.log(response.data)
        //  navigateTo('/Pago')
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response);
            console.log(
                "Valores ingresados incorrectamente, intente nuevamente"
            );
        } else if (error.request) {
            console.log("Falla en el servidor");
        } else {
            console.log(error);
        }
    });



export default ImageSlider;