/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";
import { Navigate,Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { ToastContainer } from 'react-toastify';
import './index.css';
import Login from './Login';
import Usuario from './model/usuario'; //VERSION NACHO
import Usuario_Edit from './model/Usuario_Edit'; //VERSION NACHO
import Usuario_Turno from './model/Usuario_Turno'; //VERSION NACHO
import Registrarse from './Registrarse';
import Paciente_Edit from './model/Paciente_Edit'; //VERSION NACHO
import Paciente from './model/Paciente'; //VERSION NACHO
import Paciente_Create from './model/Paciente_Create';//VERSION NACHO
import Paciente_Admin from './Paciente_Admin';
//import Paciente from './Paciente';
//import PacienteEdit from './PacienteEdit';
import Doctor from './model/Doctor'; //VERSION NACHO
import Doctor_Edit from './model/Doctor_Edit'; //VERSION NACHO
import Doctores from './Doctores';
import DoctorPublic from './model/DoctorPublic';
//import DoctoresEdit from './DoctoresEdit';
//import Usuario_Historia_Clinica from './model/Usuario_Historia_Clinica';//VERSION NACHO
import Codigo from './model/Codigo'; //VERSION NACHO
import Codigo_Edit from './model/Codigo_Edit'; //VERSION NACHO
import Horario_Doctor_Edit from './model/Horario_Doctor_Edit'; //VERSION NACHO
//import CodEstudio from './CodEstudio';
//import CodEstudioEdit from './CodEstudioEdit';
import Estudio from './model/Estudio'; //VERSION NACHO
import Estudio_Edit from './model/Estudio_Edit'; //VERSION NACHO
//import Estudio from './Estudio';
//import EstudioEdit from './EstudioEdit';
import Historia_Clinica from './model/Historia_Clinica'; //VERSION NACHO
import Informe_Edit from './model/Informe_Edit'; //VERSION NACHO
//import Historial from './Historial';
//import InformeEdit from './InformeEdit';

import Informe from './Informe';
import HistorialEdit from './HistorialEdit';
import Turnos from './Turnos';


import jwt_decode from 'jwt-decode';
import  Home  from "./Home";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  const token = localStorage.getItem('token');
  let userRole = null;
  if (token) {
  const decodedToken = jwt_decode(token);
  userRole = decodedToken.rol;
  }

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={userRole === 1 || userRole === 2 || userRole === 3? <Navigate to="/" /> : <Login />} />
          <Route path="/registrarse" element={userRole === 1 || userRole === 2 || userRole === 3? <Navigate to="/" /> : <Registrarse />} />

          <Route path="/usuario" element={userRole === 1 || userRole === 2 ? <Usuario /> : <Navigate to="/" />}/>
          <Route path="/usuario/edit" element={userRole === 1  ? <Usuario_Edit /> : <Navigate to="/" />} />
          <Route path="/usuario/edit/:id_usuario" element={userRole === 1 ? <Usuario_Edit /> : <Navigate to="/" />}/>
          <Route path="/usuario/turno/:id_usuario" element={userRole === 1 || userRole === 2 || userRole === 3 ? <Usuario_Turno /> : <Navigate to="/" />} />
          
          
          <Route path="/doctor" element={userRole === 1 || userRole === 2 ? <Doctor /> : <Navigate to="/" />} />
          <Route path="/doctores" element={userRole === 1 || userRole === 2 ? <Doctores /> : <Navigate to="/" />} />
          <Route path="/doctor/edit/:id_doctor" element={userRole === 1 || userRole === 2  ? <Doctor_Edit /> : <Navigate to="/" />} />
          <Route path="/doctor/create/:id_usuario" element={userRole === 1 || userRole === 2  ? <Doctor_Edit /> : <Navigate to="/" />} />
          <Route path="/doctor/nuevo_horario/:id_doctor" element={userRole === 1  ? <Horario_Doctor_Edit /> : <Navigate to="/" />} />
          <Route path="/doctor/public" element={<DoctorPublic />}/>
          
          
          <Route path="/paciente" element={userRole === 1 || userRole === 2 ? <Paciente />  : <Navigate to="/" />} />
          <Route path="/paciente/edit/:id_paciente" element={userRole === 1 || userRole === 3 ? <Paciente_Edit /> : <Navigate to="/" />} />
          <Route path="/paciente/create/:id_usuario" element={userRole === 1 || userRole === 3 ? <Paciente_Create />: <Navigate to="/" />}></Route> {/*Se decidio separar por cuestiones de seguridad*/}
          <Route path="/paciente/estudio/:id_paciente" element={userRole === 1 || userRole === 3 ? <Estudio_Edit />: <Navigate to="/" />}></Route> {/*Se decidio separar por cuestiones de seguridad*/}
          <Route path="/paciente/historia_clinica/:id_paciente" element={userRole === 1 || userRole === 3 ? <Historia_Clinica />: <Navigate to="/" />}></Route> {/*Se decidio separar por cuestiones de seguridad*/}
          
          
          <Route path="/turnos" element={userRole === 1 || userRole === 2 || userRole === 3? <Turnos /> : <Navigate to="/" />} />
          <Route path="/turnos/:id_usuario" element={userRole === 1 || userRole === 2 || userRole === 3? <Turnos />  : <Navigate to="/" />} />
          
          <Route path="/codigo_estudio" element={userRole === 1 ? <Codigo /> : <Navigate to="/" />} />
          <Route path="/codigo_estudio/edit/:codigo" element={userRole === 1 ? <Codigo_Edit /> : <Navigate to="/" />} />
          
          <Route path="/estudio" element={userRole === 1 || userRole === 2 ? <Estudio /> : <Navigate to="/" />} />
          <Route path="/estudio/edit/:id_estudio" element={userRole === 1 || userRole === 2 || userRole === 3 ? <Estudio_Edit /> : <Navigate to="/" />} />
          <Route path="/estudio/informe/:id_estudio" element={userRole === 1 || userRole === 2 ? <Informe_Edit /> : <Navigate to="/" />} />
          <Route path="/estudio/edit/" element={userRole === 1 || userRole === 2 || userRole === 3 ? <Estudio_Edit /> : <Navigate to="/" />} />

          
          <Route path="/informe" element={userRole === 1 || userRole === 2 || userRole === 3? <Informe />   : <Navigate to="/" />} />
          <Route path="/informe/edit/:id_informe" element={userRole === 1 || userRole === 2 ? <Informe_Edit /> : <Navigate to="/" />} />
          
          <Route path="/historia_clinica" element={userRole === 1 || userRole === 2 || userRole === 3? <Historia_Clinica />  : <Navigate to="/" />} />
          <Route path="/historia_clinica/edit/:id_historia_clinica" element={userRole === 1 || userRole === 2 ? <HistorialEdit /> : <Navigate to="/" />} />

          <Route path="/paciente_admin" element={userRole === 1 ? <Paciente_Admin />  : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
