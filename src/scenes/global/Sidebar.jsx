import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Titulo from "../../components/Titulo";

import jwt_decode from 'jwt-decode';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.white,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");


  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t !== token) {
      setToken(t);
    }
  });

  function verificarTokenCaducado(token) {
    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  }


  const jwtToken = localStorage.getItem('token');
  if (jwtToken) {
    if (verificarTokenCaducado(jwtToken)) {
      localStorage.removeItem('token');
      setToken("");
      navigate("/");
      window.location.reload();
    }
  }

  const IralaURL = url => {
    if (url) {
      navigate(url);
    }
  }


  if (token !== "" && token !== null) {
    var decoded = jwt_decode(localStorage.getItem('token'))
    var rol = decoded.rol
    if (rol === 3) {
      rol = "Paciente"
    } else if (rol === 2) {
      rol = "Doctor"
    } else if (rol === 1) {
      rol = "ADMIN";
    }

    return <>


      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: "grey !important",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
            color: "white",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#9653B8 !important",
          },
          "& .pro-menu-item.active": {
            color: "#9653B8 !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.white,
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  
                    <Titulo style={{
                      fontFamily: 'Helvetica',
                      color: "white",
                      fontSize: "20px",
                      fontWeight: 'bold',

                      alignSelf: "center",
                      width: "100%",
                      border: "none",
                    }}> KLINICAL</Titulo>
                  
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/ProfileIcon.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Titulo style={{ fontFamily: 'Helvetica', color: 'white', fontSize: '1rem', fontWeight: 'bold', paddingTop: '50px' }}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {`Bienvenid@! U: ${decoded.id_usuario} ${decoded.nombre}`}
                  </Titulo>
                  <Titulo style={{ fontFamily: 'Helvetica', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', paddingTop: '10px' }}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {`ROL: ${rol}`}
                  </Titulo>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>

              {rol === "ADMIN" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Usuarios"
                  to="/usuario"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Doctores"
                  to="/doctores"
                  icon={<LocalHospitalIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Turnos"
                  to="/turnos"
                  icon={<CalendarMonthIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Cod. Estudios"
                  to="/codigo_estudio"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pacientes"
                  to="/paciente"
                  icon={<PersonAddAltIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Historias Clínicas"
                  to="/historia_clinica"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Estudios"
                  to="/estudios"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Informes"
                  to="/informe"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> </>)}

              {rol === "Doctor" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Usuarios"
                  to="/usuario"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Doctores"
                  to="/doctores"
                  icon={<LocalHospitalIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Turnos"
                  to="/turnos"
                  icon={<CalendarMonthIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pacientes"
                  to="/paciente"
                  icon={<PersonAddAltIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Historias Clínicas"
                  to="/historia_clinica"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Estudios"
                  to="/estudios"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Informes"
                  to="/informe"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> </>)}

              {rol === "Paciente" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Mis Turnos"
                  to="/turnos"
                  icon={<CalendarMonthIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Mi Historia Clínica"
                  to="/historia_clinica"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Mis Informes"
                  to="/informe"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> </>)}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>;
  } else {
    return <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className='nav-link'>Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/login" className='nav-link'>Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/registrarse" className='nav-link'>Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  }
};

export default Sidebar;