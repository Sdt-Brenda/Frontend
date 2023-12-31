import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalCodigoEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            descripcion: ''
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

    componentDidMount() {
        if (this.props.params.codigo) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/codigo_estudio/${this.props.params.codigo}`, parametros)
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
                                nombre: result.body.detail.nombre,
                                codigo: result.body.detail.codigo,
                                descripcion: result.body.detail.descripcion
                            });
                        } else {
                            toast.error(result.body.message, this.toastConfig);
                        }
                    })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let codigo_estudio = {
            nombre: this.state.nombre,
            descripcion: this.state.descripcion
        }

        let parametros = {
            method: this.props.params.codigo ? 'PUT' : 'POST',
            body: JSON.stringify(codigo_estudio),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = this.props.params.codigo ? `http://localhost:8080/api/codigo_estudio/${this.props.params.codigo}` : "http://localhost:8080/api/codigo_estudio"

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
                    toast.success(result.body.message, this.toastConfig);
                    this.props.navigate("/codigo_estudio")
                } else {
                    toast.error(result.body.message, this.toastConfig);
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        this.props.navigate("/codigo")
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.codigo ? `Editar Código ${this.props.params.codigo}` : "Cargar Código"}</h1>
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
                                    id='floatingDescripcion'
                                    value={this.state.descripcion}
                                    name='descripcion'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDescripcion">Descripción</label>
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

export default Codigo_Edit

export function Codigo_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalCodigoEdit navigate={navigate} params={p} />
        </>
    );
}