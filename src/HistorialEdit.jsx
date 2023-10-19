import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class HistorialE extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_historia_clinica: '',
            id_usuarioP: '',
            id_turno: '',
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let historialx = {
            id_usuarioP: this.state.id_usuarioP,
            id_turno: this.state.id_turno,
        }

        let parametros = {
            method: 'PUT',
            body: JSON.stringify(historialx),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/historia_clinica/${this.props.params.id_historia_clinica}`

        fetch(url, parametros)
            .then(res => {
                console.log('Response:', res);
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
                    result => {debugger
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
                        this.props.navigate("/informe")
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
                        <h1>{ `Editar Estudio: ${this.props.params.id_historia_clinica}`}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_usuarioP'
                                    value={this.state.id_usuarioP}
                                    name='id_usuarioP'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_usuarioP">id_usuarioP</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_turno'
                                    value={this.state.id_turno}
                                    name='id_turno'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_turno">id_turno</label>
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

export default HistorialEditar


export function HistorialEditar() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <HistorialE navigate={navigate} params={p} />
        </>
    );
}