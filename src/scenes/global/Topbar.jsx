import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// ** Icons Imports

import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import AccountOutline from 'mdi-material-ui/AccountOutline';

import jwt_decode from 'jwt-decode';


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleDropdownClose = url => {
    if (url) {
      navigate(url);
    }
    setAnchorEl(null);
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  };

  const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }));

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


  function logout() {
    localStorage.removeItem('token');
    setToken("");
    navigate("/");
    window.location.reload();
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
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
        </Box>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <Badge
              overlap='circular'
              onClick={handleDropdownOpen}
              sx={{ ml: 2, cursor: 'pointer' }}
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                alt='JOHN DOE'
                onClick={handleDropdownOpen}
                sx={{ width: 40, height: 40 }}
                src='../../assets/ProfileIcon.png'
              />
            </Badge>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleDropdownClose()}
              sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge
                    overlap='circular'
                    badgeContent={<BadgeContentSpan />}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Avatar alt='ADMIN' src='../../assets/ProfileIcon.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
                  </Badge>
                  <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600 }}>John Doe</Typography>
                    <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>Rol del usuario</Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mt: 0, mb: 1 }} />
              <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose("/paciente/")}>
                <Box sx={styles}>
                  <AccountOutline sx={{ marginRight: 2 }} />Perfil
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem sx={{ py: 2 }} onClick={logout}>
                <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                Desconectarse
              </MenuItem>
            </Menu>
          </IconButton>
        </Box>
      </Box>
    </>;
  }
};

export default Topbar;