import React, { Component } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom/dist';

import Login from "./Login";
import Titulo from "./components/Titulo";
import styles from "./styles/Home.module.css";
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';




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
                        console.log("error xdxd");
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


            return (
                <div className={styles.containerX}>
                    <div className={styles.textX}>

                        <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'center' }}>
                            Tus operaciones tan solo a un click de distancia!
                        </Titulo>

                        <Link to={`/usuario/turno/${id_usuario}`}>
                            <input
                                style={{
                                    backgroundColor: "#9653B8",
                                    fontFamily: 'Helvetica',
                                    color: 'white',
                                    fontSize: "20px",
                                    fontWeight: 'black',
                                    width: "100%",
                                    border: "none",
                                    marginTop: '25px'
                                }}
                                className="btn btn-primary"
                                type="submit"
                                value="Obtener turno con un médico"
                            /> </Link>

                        <br />


                        <Link to="#" onClick={this.handleCheck}>
                            <input
                                style={{
                                    backgroundColor: "#9653B8",
                                    fontFamily: 'Helvetica',
                                    color: 'white',
                                    fontSize: "20px",
                                    fontWeight: 'black',
                                    width: "100%",
                                    border: "none",
                                    marginTop: '25px'
                                }}
                                className="btn btn-primary"
                                type="submit"
                                value="Obtener turno para estudio clínico"
                            />
                        </Link>

                        <br />


                        <Link to="#" onClick={this.handleCheck2}>
                            <input
                                style={{
                                    backgroundColor: "#808080",
                                    fontFamily: 'Helvetica',
                                    color: 'white',
                                    fontSize: "20px",
                                    fontWeight: 'black',
                                    width: "100%",
                                    border: "none",
                                    marginTop: '25px'
                                }}
                                className="btn btn-primary"
                                type="submit"
                                value="Consultar historia clínica"
                            />
                        </Link>
                        <br />

                        <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left' }}>
                            Necesitas ayuda? <a href="/registrarse" style={{ color: "#9653B8" }}> Más información. </a>.
                        </Titulo>

                    </div>
                </div>
            );
        } else { // <---
            return (

                <div className={styles.container}>
                    <div className={styles.text}>

                        <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'left' }}>
                            Bienvenido a
                        </Titulo>

                        <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'left' }}>
                            Klinical!
                        </Titulo>

                        <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left', paddingTop: '50px' }}>
                            KLINICAL te ofrece un sistema integral orientado a clínicas y escalable a la medida de tus necesidades.
                            Que permite la gestión y obtención de turnos por parte de sus usuarios.
                            El Sistema engloba las distintas áreas y especialidades existentes en el establecimiento médico que integre su uso.
                            Y además posee una base de datos con todos los doctores que allí trabajan,
                            facilitando y acercando la información del establecimiento a los pacientes que la requieran.
                        </Titulo>

                        <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left', paddingTop: '50px' }}>
                            Con KLINICAL, la gestión de turnos y la comunicación entre tu clínica y los pacientes se vuelven más fáciles y accesibles que nunca.
                            Descubre cómo podemos optimizar tu práctica médica y mejorar la experiencia de tus pacientes.
                        </Titulo>

                        <Link to="/Home">
                            <input
                                style={{
                                    width: "100%",
                                    fontSize: "20px",
                                    backgroundColor: "black",
                                    border: "none",
                                    marginTop: '50px'
                                }}
                                className="btn btn-primary"
                                type="submit"
                                value="Conoce nuestros profesionales"
                            />
                        </Link>

                        <br />
                        <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'left' }}>
                            Necesitas ayuda? <a href="/" style={{ color: "#9653B8" }}> Más información. </a>
                        </Titulo>

                    </div>

                    <div className={styles.log}>
                        <Login></Login>
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