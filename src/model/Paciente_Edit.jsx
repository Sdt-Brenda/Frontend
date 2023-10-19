import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalPacienteEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obra_social: '',
            pais: '',
            provincia: '',
            localidad: '',
            direccion: ''
        };
    }

    componentDidMount() {
        if (this.props.params.id_paciente) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/paciente/edit/${this.props.params.id_paciente}`, parametros)
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
                        if (result.ok) {
                            this.setState({
                                obra_social: result.body.detail.obra_social,
                                pais: result.body.detail.pais,
                                provincia: result.body.detail.provincia,
                                localidad: result.body.detail.localidad,
                                direccion: result.body.detail.direccion
                            });
                        } else {
                            toast.error(result.body.message, {
                                position: "bottom-center",
                                autoClose: 5000,
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
        let paciente = {
            obra_social: this.state.obra_social,
            pais: this.state.pais,
            provincia: this.state.provincia,
            localidad: this.state.localidad,
            direccion: this.state.direccion
        }

        let parametros = {
            method: 'PUT',
            body: JSON.stringify(paciente),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        fetch(`http://localhost:8080/api/paciente/${this.props.params.id_paciente}`, parametros)
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
                            toast.success(result.body.message, {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            this.props.navigate(`/paciente`);
                        } else {
                            toast.error(result.body.message, {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }
                    });
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
                        <h1>{this.props.params.id_paciente ? `Editar Paciente ${this.props.params.id_paciente}` : "Crear nuevo Paciente"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
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
                                    type="text"
                                    className="form-control"
                                    id='floatingPais'
                                    value={this.state.pais}
                                    name='pais'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingPais">Pais</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
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
                                    type="text"
                                    className="form-control"
                                    id='floatingDireccion'
                                    value={this.state.direccion}
                                    name='direccion'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDireccion">Dirección</label>
                            </div>
                            <br />
                            <div className="mb-3">
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

export default Paciente_Edit


export function Paciente_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalPacienteEdit navigate={navigate} params={p} />
        </>
    );
}
