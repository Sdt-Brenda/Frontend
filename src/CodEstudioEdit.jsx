import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class CodEstudioE extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codigo: '',
            descripcion: '',
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();

        let codigoEstudio = {
            descripcion: this.state.descripcion,
        }
debugger
        let parametros = {
            method: 'PUT',
            body: JSON.stringify(codigoEstudio),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/codigo_estudio/${this.props.params.codigo}`

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
                    result => {
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
                           this.props.navigate("/codigo_estudio")
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
                        <h1>{ `Editar Estudio: ${this.props.params.codigo}`}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingdescripcion'
                                    value={this.state.descripcion}
                                    name='descripcion'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingdescripcion">descripcion</label>
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

export default CodEstudioE


export function CodEstudioEdit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <CodEstudioE navigate={navigate} params={p} />
        </>
    );
}