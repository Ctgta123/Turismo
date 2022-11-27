import {useState , useEffect} from "react"
import axios from "axios";


export const getDeptos = ()=>{

    const baseUrl="https://webapirestturismoreal.azurewebsites.net/api/Catalogo"
    const [data, setData]=useState([]);

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
   
    useEffect(()=>{
        peticionGet();
    },[])

    return data
}