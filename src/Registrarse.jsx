import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./styles/Registrarse.module.css";
import Titulo from "./components/Titulo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';



export class InternalRegistrarse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            fecha_nacimiento: '',
            genero: '',
            email: '',
            password: '',
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const usuario = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            dni: this.state.dni,
            fecha_nacimiento: this.state.fecha_nacimiento,
            genero: this.state.genero,
            email: this.state.email,
            password: this.state.password,
        };
        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        };

        fetch(`http://localhost:8080/api/registro`, parametros)
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
                    toast.success(result.body.message, {
                        position: 'bottom-center',
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    fetch(`http://localhost:8080/api/usuario/email/${usuario.email}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    })
                        .then(res => res.json())
                        .then(userData => {
                            this.props.navigate(`/paciente/create/${userData}`);
                        }
                        )
                        .catch(error => {
                            console.error('Fetch user data error:', error);
                        });
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
                console.log('Error:', error);
            });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleDateChange = (date) => {
        this.setState({ fecha_nacimiento: date });
    };






    render() {
        return (
            <div className={styles.container}>

                <div className={styles.card_register}>

                    <a href="/" className={styles.homeButton}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </a>

                    <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '2rem', fontWeight: 'bold', textAlign: 'left', paddingLeft: '10px', paddingTop: '10px' }}>
                        Registrate</Titulo>
                    <Titulo style={{ fontFamily: 'Helvetica', color: '#848482', fontSize: '1rem', fontWeight: 'light', textAlign: 'left', paddingLeft: '10px', paddingTop: '0' }}>
                        Por favor, ingresa tus datos.</Titulo>

                    <div className="container">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingNombre'
                                    value={this.state.nombre}
                                    name='nombre'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingNombre">Nombre</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingApellido'
                                    value={this.state.apellido}
                                    name='apellido'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingApellido">Apellido</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingDNI'
                                    value={this.state.dni}
                                    name='dni'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDNI">DNI</label>
                            </div>

                            <div className="form-floating">
                                <div className={styles.date_picker_container}>
                                    <label>Fecha de Nacimiento</label>
                                    <DatePicker style={{ width: '400px' }}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                        showMonthDropdown
                                        scrollableMonthDropdown
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={150}
                                        selected={this.state.fecha_nacimiento}
                                        onChange={this.handleDateChange}
                                        maxDate={new Date()}
                                        minDate={new Date('1900-01-01')}
                                        locale={es}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="genero_id"
                                    onChange={this.handleChange}
                                    value={this.state.genero}
                                    name="genero"
                                    aria-label="Default select example">
                                    <option value="" disabled>
                                        Genero
                                    </option>
                                    <option value="1">Femenino</option>
                                    <option value="2">Masculino</option>
                                    <option value="3">Otros</option>
                                </select>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingEmail'
                                    value={this.state.email}
                                    name='email'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id='floatingPassword'
                                    value={this.state.password}
                                    name='password'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <input
                                style={{
                                    backgroundColor: "#9653B8",
                                    fontFamily: 'Helvetica',
                                    color: 'white',
                                    fontSize: "20px",
                                    fontWeight: 'black',

                                    alignSelf: "center",
                                    width: "100%",
                                    border: "none",
                                }}
                                className="btn btn-primary"
                                type="submit"
                                value="REGISTRARSE"
                            />
                        </form>


                    </div>
                </div>
            </div >
        );
    }
}

export default Registrarse


export function Registrarse() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalRegistrarse navigate={navigate} params={p} />
        </>
    );
}