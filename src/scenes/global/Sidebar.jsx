import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import jwt_decode from 'jwt-decode';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
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
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
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
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    <svg
                      width={30}
                      height={25}
                      version='1.1'
                      viewBox='0 0 30 23'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                        <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                          <g id='logo' transform='translate(95.000000, 50.000000)'>
                            <path
                              id='Combined-Shape'
                              fill={theme.palette.primary.main}
                              d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                              transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                              transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                            />
                            <path
                              id='Rectangle'
                              fillOpacity='0.15'
                              fill={theme.palette.common.white}
                              d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                            />
                            <path
                              id='Rectangle'
                              fillOpacity='0.35'
                              fill={theme.palette.common.white}
                              transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                              d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                            />
                          </g>
                        </g>
                      </g>
                    </svg>Klinical
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
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
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {`Bienvenid@! U: ${decoded.id_usuario} ${decoded.nombre}`}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {`ROL: ${rol}`}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>

              {rol === "ADMIN" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Panel de Usuarios"
                  to="/usuario"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Doctores"
                  to="/doctor"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Turnos"
                  to="/turnos"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Cod Estudios"
                  to="/codigo_estudio"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Pacientes"
                  to="/paciente"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestionar Estudios"
                  to="/estudio"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestionar Informes"
                  to="/informe"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> </>)}

              {rol === "Doctor" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Panel de Usuarios"
                  to="/usuario"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Doctores"
                  to="/doctor"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Turnos"
                  to="/turnos"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion de Pacientes"
                  to="/paciente"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestionar Estudios"
                  to="/estudio"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestionar Informes"
                  to="/informe"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> </>)}

              {rol === "Paciente" && (<>
                <Item
                  title="Home"
                  to="/"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Solicitar Turno"
                  to="/turnos"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Mi historia Clinica"
                  to="/historia_clinica"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Ver mis Informes"
                  to="/informe"
                  icon={<BarChartOutlinedIcon />}
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
