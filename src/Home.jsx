import React, { Component } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom/dist';

import Login from "./Login";
import Titulo from "./components/Titulo";
import styles from "./styles/Home.module.css";

export class Home extends Component {

    render() {
        const token = localStorage.getItem('token'); // <---

        if (token) { // <---
            return (
                <div className={styles.containerX}>
                    <div className={styles.textX}>

                        <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '4,5rem', fontWeight: 'bold', textAlign: 'center' }}>
                            Tus operaciones tan solo a un click de distancia!
                        </Titulo>

                        <Link to="/">
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

                        <Link to="/">
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
                            /> </Link>

                        <br />

                        <Link to="/">
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
                            /> </Link>

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