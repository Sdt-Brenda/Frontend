import React, { Component } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom/dist';

import Login from "./Login";
import Titulo from "./components/Titulo";
import styles from "./styles/Home.module.css";
import jwt_decode from 'jwt-decode';

import Swiper from "./Carrusel.jsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pacientes: [],
            usuarios_P: [],
            id_paciente: "",
            id_usuario: "",
        };
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            const id_usuario = decodedToken.id_usuario;
            const rol = decodedToken.rol;
            if (rol === 3) {
                let parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': token}};
                const url = `http://localhost:8080/api/paciente/test/nada/${id_usuario}`;
                fetch(url, parametros)
                    .then(res => {
                        return res.json()
                            .then(body => (
                                {status: res.status,
                                    ok: res.ok,
                                    headers: res.headers,
                                    body: body})
                            ).then(
                                result => {
                                    if (result.ok) {
                                        this.setState({
                                            usuarios_P: result.body,
                                        });
                                        if (result.body.length === 0) {
                                            const navigate = this.props.navigate;
                                            navigate(`/paciente/create/${id_usuario}`);
                                        }
                                    } else {
                                    }
                                });
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
            }
        }
    };

    handleCheck = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const id_usuario = decodedToken.id_usuario;
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': token
                }
            };
            const url = `http://localhost:8080/api/paciente/test/nada/${id_usuario}`;
            fetch(url, parametros)
            .then(res => {
                return res.json()
                    .then(body => (
                        {status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body})
                    ).then(
                        result => {
                    if (result.ok) {
                        const id_paciente = result.body[0].id_paciente;
                        const navigate = this.props.navigate;
                        navigate(`/paciente/estudio/${id_paciente}`);
                    } else {
                        console.log("error");
                    }
            })})
                .catch(error => {
                    console.log('Error in fetch:', error);
                });
        }
    };

    handleCheck2 = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const id_usuario = decodedToken.id_usuario;
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': token
                }
            };
            const url = `http://localhost:8080/api/paciente/test/nada/${id_usuario}`;
            fetch(url, parametros)
            .then(res => {
                return res.json()
                    .then(body => (
                        {status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body})
                    ).then(
                        result => {
                    if (result.ok) {
                        const id_paciente = result.body[0].id_paciente;
                        const navigate = this.props.navigate;
                        navigate(`/paciente/historia_clinica/paciente/${id_paciente}`);
                    } else {
                        console.log("error xdxd");
                    }
            })})
                .catch(error => {
                    console.log('Error in fetch:', error);
                });
        }
    };


    render() {
        const token = localStorage.getItem('token'); // <---

        if (token) { // <---
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            const id_usuario = decodedToken.id_usuario;


            return ( //LOGIN
                <div className={styles.Bground}>
                    <div className={styles.containerX}>

                        <div className={styles.carrusel}>

                            <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '26px', fontWeight: '700', textAlign: 'left', marginBottom: '24px', }}>
                                Conoce todo lo que Klinical tiene para ofrecerte.
                            </Titulo>

                            <Swiper></Swiper>

                            <div className={styles.textX}>

                                <Link to={`/usuario/turno/${id_usuario}`} className={styles.buttonLink}>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        
                                        OBTENER TURNO
                                        <br />
                                        MÉDICO

                                    </button>
                                </Link>

                                <Link to="#" onClick={this.handleCheck} className={styles.buttonLink}>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        
                                        OBTENER TURNO
                                        <br />
                                        ESTUDIO CLÍNICO

                                    </button>
                                </Link>

                                <Link to="#" onClick={this.handleCheck2} className={styles.buttonLink}>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        
                                        CONSULTAR
                                        <br />
                                        HISTORIA
                                        CLÍNICA

                                    </button>
                                </Link>

                            </div>

                        </div>

                    </div>
                </div>
            );
        } else { //LOGOUT
            return (
                <div className={styles.Bground}>
                    <div className={styles.container}>
                        <div className={styles.text}>

                            <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'left' }}>
                                Bienvenido a
                            </Titulo>

                            <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'left' }}>
                                Klinical!
                            </Titulo>

                            <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left', paddingTop: '24px' }}>
                                KLINICAL te ofrece un sistema integral orientado a clínicas y escalable a la medida de tus necesidades.
                                Que permite la gestión y obtención de turnos por parte de sus usuarios.
                                El Sistema engloba las distintas áreas y especialidades existentes en el establecimiento médico que integre su uso.
                                Y además posee una base de datos con todos los doctores que allí trabajan,
                                facilitando y acercando la información del establecimiento a los pacientes que la requieran.
                                <br />
                                <br />
                                Con KLINICAL, la gestión de turnos y la comunicación entre tu clínica y los pacientes se vuelven más fáciles y accesibles que nunca.
                                Descubre cómo podemos optimizar tu práctica médica y mejorar la experiencia de tus pacientes.
                            </Titulo>

                            <Link to="/doctor/public" className={styles.buttonNavigate}>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    CONOCE NUESTRO PROFESIONALES
                                </button>
                            </Link>

                            <br />
                            <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left', marginTop: '14px' }}>
                                Necesitas ayuda? <a href="/" style={{ color: "#B087BC" }}> Más información. </a>
                            </Titulo>

                        </div>

                        <div className={styles.log}>
                            <Login></Login>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default Homee


export function Homee() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Home navigate={navigate} params={p} />
        </>
    );
}