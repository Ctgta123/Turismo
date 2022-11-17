import { Route, Routes, Navigate } from "react-router-dom";
import { CatalogoPage } from "../TurismoApp/pages/CatalogoPage";
import { Homeoff } from "../TurismoApp/pages/Homeoff";
import { HomePage } from "../TurismoApp/pages/HomePage";
import { Footer } from "../ui/components/Footer";
import { Header } from "../ui/components/Header";
import { DeptoPage } from "../TurismoApp/pages/DeptoPage";
import { Login } from "../TurismoApp/pages/Login";
import { Registro } from "../TurismoApp/pages/Registro";
import { Rcontraseña } from "../TurismoApp/pages/Rcontraseña";
import { Dashboard } from "../TurismoApp/pages/Dashboard";
import { Logout } from "../TurismoApp/pages/Logout"
import { Reservar } from "../TurismoApp/pages/Reservar"
import { Dcliente } from "../TurismoApp/pages/Dcliente"
import { MisReservas } from "../TurismoApp/pages/MisReservas"



export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Home" element={<Homeoff to="/Home" />} />
        <Route path="/index" element={<HomePage/>} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/DeptoPage/:id/" element={<DeptoPage />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/Rcontraseña" element={<Rcontraseña/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Logout" element={<Logout/>} />
        <Route path="/Reservar/:id/" element={<Reservar/>} />
        <Route path="/Dcliente" element={<Dcliente/>} />
        <Route path="/MisReservas" element={<MisReservas/>} />
        <Route path="/*" element={<Navigate to="home" />} />
      </Routes>
      <Footer />
    </>
  );
};
 