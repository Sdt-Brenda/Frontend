import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalUsuarioEdit extends Component {
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
            rol: ''
        };
    }

    componentDidMount() {
        if (this.props.params.id_usuario) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/usuario/${this.props.params.id_usuario}`, parametros)
                .then(res => {
                    return res.json()
                        .then(body => {
                            return {
                                status: res.status,
                                ok: res.ok,
                                headers: res.headers,
                                body: body
                            };
                        })
                }).then(
                    result => {
                        if (result.ok) {debugger
                            const parsedDate = new Date(result.body.detail.fecha_nacimiento);
                            const formattedDate = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;

                            this.setState({
                                nombre: result.body.detail.nombre,
                                apellido: result.body.detail.apellido,
                                dni: result.body.detail.dni,
                                fecha_nacimiento: formattedDate,
                                genero: result.body.detail.genero,
                                email: result.body.detail.email,
                                password: result.body.detail.password,
                                rol: result.body.detail.rol
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
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
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
            password: this.state.password,
            rol: this.state.rol
        }

        let parametros = {
            method: this.props.params.id_usuario ? 'PUT' : 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = this.props.params.id_usuario ? `http://localhost:8080/api/usuario/${this.props.params.id_usuario}` : "http://localhost:8080/api/usuario"

        fetch(url, parametros)
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
                );
            })
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, {
                        position: "bottom-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
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
                            if (userData && usuario.rol === "3") {
                                this.props.navigate(`/paciente/create/${userData}`);
                            } else if (userData && usuario.rol === "2") {
                                this.props.navigate(`/doctor/create/${userData}`);
                            } else {
                                this.props.navigate(`/usuario`);
                            }
                        })
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

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.id_usuario ? `Editar Usuario ${this.props.params.id_usuario}` : "Crear nuevo Usuario"}</h1>
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
                            <br />
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
                            <br />
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
                            <br />
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id='floatingFecha_Nacimiento'
                                    value={this.state.fecha_nacimiento}
                                    name='fecha_nacimiento'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingFecha_Nacimiento">Fecha de Nacimiento</label>
                            </div>
                            <br />
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
                            <br />
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
                            <br />
                            <div className="form-floating">
                                <input required
                                    type="password"
                                    className="form-control"
                                    id='floatingPassword'
                                    value={this.state.password}
                                    name='password'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <br />
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="rol_id"
                                    onChange={this.handleChange}
                                    value={this.state.rol}
                                    name="rol"
                                    aria-label="Default select example">
                                    <option value="" disabled>
                                        Rol
                                    </option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Paciente</option>
                                </select>
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

export default Usuario_Edit


export function Usuario_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalUsuarioEdit navigate={navigate} params={p} />
        </>
    );
}