import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import styles from "./styles/Login.module.css";
import Titulo from "./components/Titulo";
import imageK from "./assets/LogFavicon.svg";

function Login() {
    const [dni, setDNI] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let usuario = {
            dni,
            password,
        };

        let parametros = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch("http://localhost:8080/api/security/login", parametros)
            .then((res) => {
                return res.json().then((body) => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body,
                    };
                });
            })
            .then((result) => {
                if (result.ok) {
                    localStorage.setItem('token', result.body.token);
                    toast.success("Bienvenid@", {
                        position: "bottom-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/")
                    window.location.reload();
                } else {
                    toast.error(result.body.message, {
                        position: "bottom-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    const handleChange = (event) => {
        if (event.target.name === 'dni') {
            setDNI(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    };

    return (

        <div className={styles.container}>
            <div className={styles.card_login}>
                <img className={styles.img} src={imageK} alt="Klinical" />
                {/*<Titulo style={{ color: 'black', fontSize: '2rem', textAlign: 'left', paddingLeft: '10px' }}>Inicia Sesión</Titulo>*/}
                <Titulo style={{ color: '#848482', fontSize: '1rem', textAlign: 'left', paddingLeft: '10px', marginBottom: '14px', fontWeight: 'lighter', fontFamily: 'Helvetica' }}>Por favor, ingresa tus datos.</Titulo>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>

                            <form onSubmit={handleSubmit}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "3px",
                                }}>

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='floatingDNI'
                                        value={dni}
                                        name='dni'
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingDNI">DNI</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id='floatingPassword'
                                        value={password}
                                        name='password'
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                    <Titulo
                                        style={{ fontFamily: 'Helvetica', fontSize: '1rem', fontWeight: 'lighter', textAlign: 'right', marginTop: '14px' }}>
                                        <a href="/" style={{ color: "#B087BC", textDecoration: "none" }}>Olvidaste tu contraseña?</a></Titulo>
                                </div>
                                <br />

                                <input
                                    className={styles.btnPry}
                                    type='submit'
                                    value='INGRESAR'
                                />

                                <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'lighter', marginTop: '14px' }}>
                                    Nuevo/a en la plataforma? <a href="/registrarse" style={{ color: "#B087BC", textDecoration: "none" }}>Create una cuenta</a>.
                                </Titulo>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;

//VERSION DE CLASE


// import React, { Component } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export class Loginxd extends Component {
//     constructor() {
//         super();
//         this.state = {
//             dni: '',
//             password: '',
//         };
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();

//         let usuario = {
//             dni: this.state.dni,
//             password: this.state.password,
//         };

//         let parametros = {
//             method: 'POST',
//             body: JSON.stringify(usuario),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         fetch("http://localhost:8080/api/security/login", parametros)
//             .then((res) => {
//                 return res.json().then((body) => {
//                     return {
//                         status: res.status,
//                         ok: res.ok,
//                         headers: res.headers,
//                         body: body,
//                     };
//                 });
//             })
//             .then((result) => {
//                 if (result.ok) {
//                     localStorage.setItem('token', result.body.token);
//                     toast.success("Bienvenid@", {
//                         position: "bottom-center",
//                         autoClose: 500,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                     });
//                     this.props.navigate("/usuario")
//                     window.location.reload();
//                 } else {
//                     toast.error(result.body.message, {
//                         position: "bottom-center",
//                         autoClose: 500,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                     });
//                 }
//             })
//             .catch((error) => {
//                 toast.error(error.message, {
//                     position: "bottom-center",
//                     autoClose: 500,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//             });
//     };

//     handleChange = (event) => {
//         if (event.target.name === 'dni') {
//             this.setState({ dni: event.target.value });
//         } else if (event.target.name === 'password') {
//             this.setState({ password: event.target.value });
//         }
//     };

//     render() {
//         return (
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col'>
//                         <h1>Iniciar Sesión</h1>
//                         <form onSubmit={this.handleSubmit}>
//                             <div className="form-floating">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id='floatingDNI'
//                                     value={this.state.dni}
//                                     name='dni'
//                                     onChange={this.handleChange}
//                                 />
//                                 <label htmlFor="floatingDNI">DNI</label>
//                             </div>
//                             <br />
//                             <div className="form-floating">
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id='floatingPassword'
//                                     value={this.state.password}
//                                     name='password'
//                                     onChange={this.handleChange}
//                                 />
//                                 <label htmlFor="floatingPassword">Password</label>
//                             </div>
//                             <br />
//                             <input
//                                 className='btn btn-primary'
//                                 type='submit'
//                                 value='Ingresar'
//                             />
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Login;

// export function Login() {
//     const p = useParams();
//     const navigate = useNavigate();
//     return (
//         <>
//             <Loginxd navigate={navigate} params={p} />
//         </>
//     );
// }
