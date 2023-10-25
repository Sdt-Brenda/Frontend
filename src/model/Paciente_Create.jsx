import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

export class InternalPacienteCreate extends Component {
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
            obra_social: '',
            pais: '',
            provincia: '',
            localidad: '',
            direccion: ''
        };
    }

    toastConfig = {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let usuario = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            dni: this.state.dni,
            fecha_nacimiento: this.state.fecha_nacimiento,
            genero: this.state.genero,
            email: this.state.email,
            password: this.state.password
        }

        let parametrosU = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        fetch("http://localhost:8080/api/usuario/paciente", parametrosU)
            .then(res => {
                return res.json()
                    .then(body => (
                        {
                            status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body
                        }
                    )
                    );
            })
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, this.toastConfig);
                    let parametrosG = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    };
                    fetch(`http://localhost:8080/api/usuario/email/${usuario.email}`, parametrosG)
                        .then((res) => {
                            return res.json().then((body) => ({
                                status: res.status,
                                ok: res.ok,
                                headers: res.headers,
                                body: body,
                            }));
                        }).then((data) => {
                            if (data.ok) {
                                const idUsuario = data.body.id_usuario;
                                this.setState({ id_usuario: idUsuario });
                                let paciente = {
                                    obra_social: this.state.obra_social,
                                    pais: this.state.pais,
                                    provincia: this.state.provincia,
                                    localidad: this.state.localidad,
                                    direccion: this.state.direccion,
                                    id_paciente: idUsuario //inconsistencia
                                }
                                let parametrosP = {
                                    method: 'POST',
                                    body: JSON.stringify(paciente),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'token': localStorage.getItem('token')
                                    }
                                }

                                fetch(`http://localhost:8080/api/paciente/${idUsuario}`, parametrosP)
                                    .then(res => {
                                        return res.json().then(
                                            body => (
                                                {
                                                    status: res.status,
                                                    ok: res.ok,
                                                    headers: res.headers,
                                                    body: body
                                                }
                                            )
                                        ).then(
                                            result => {
                                                if (result.ok) {
                                                    toast.success(result.body.message, this.toastConfig);
                                                } else {
                                                    toast.error(result.body.message, this.toastConfig);
                                                }
                                            });
                                    })
                                    .catch((error) => {
                                        console.log('Error:', error);
                                        toast.error('An error occurred during user creation.', this.toastConfig);
                                    });
                                this.props.navigate("/paciente")
                            } else {
                                toast.error(data.body.message, this.toastConfig);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            toast.error('An error occurred during user creation.', this.toastConfig);
                        });
                } else {
                    toast.error(result.body.message, this.toastConfig);
                }
            });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleDateChange = (date) => {
        this.setState({ fecha_nacimiento: date });
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{"Crear nuevo Paciente"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingNombre'
                                    value={this.state.nombre}
                                    name='nombre'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingNombre">Nombre</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingApellido'
                                    value={this.state.apellido}
                                    name='apellido'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingApellido">Apellido</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingDNI'
                                    value={this.state.dni}
                                    name='dni'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDNI">DNI</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <div>
                                    <label>Fecha de Nacimiento</label>
                                    <DatePicker style={{ width: '400px' }}
                                        required
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
                            <br />
                            <div className="mb-3">
                                <select
                                    required
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
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingEmail'
                                    value={this.state.email}
                                    name='email'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    id='floatingPassword'
                                    value={this.state.password}
                                    name='password'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingObraSocial'
                                    value={this.state.obra_social}
                                    name='obra_social'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingObraSocial">Obra Social</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingPais'
                                    value={this.state.pais}
                                    name='pais'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingPais">País</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingProvincia'
                                    value={this.state.provincia}
                                    name='provincia'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingProvincia">Provincia</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingLocalidad'
                                    value={this.state.localidad}
                                    name='localidad'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingLocalidad">Localidad</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id='floatingDireccion'
                                    value={this.state.direccion}
                                    name='direccion'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDireccion">Dirección</label>
                            </div>
                            <br />
                            <input
                                className='btn btn-primary'
                                type='submit'
                                value='Guardar'
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Paciente_Create


export function Paciente_Create() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalPacienteCreate navigate={navigate} params={p} />
        </>
    );
}