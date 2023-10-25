import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalInformeEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            observaciones: ''
        };
    }

    componentDidMount() {
        if (this.props.params.id_informe) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/informe/edit/${this.props.params.id_informe}`, parametros)
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
                                informe: result.body.detail.informe
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
        let informe = {
            observaciones: this.state.observaciones
        }

        let parametros = {
            method: this.props.params.id_informe ? 'PUT' : 'POST',
            body: JSON.stringify(informe),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = this.props.params.id_informe ? `http://localhost:8080/api/informe/${this.props.params.id_informe}` : `http://localhost:8080/api/informe/${this.props.params.id_estudio}`

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
                            this.props.navigate("/usuario") //Que vaya a Home quizas? como sea que se llame el Hub de los informees
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
                        <h1>{this.props.params.id_informe ?  `Cargar Informe para el Estudio ${this.props.params.id_informe}` : `Editar Informe para el estudio: ${this.props.params.id_estudio}`}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                required
                                    type="text"
                                    className="form-control"
                                    id='floatingObservaciones'
                                    value={this.state.observaciones}
                                    name='observaciones'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingObservaciones">Observaciones</label>
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

export default Informe_Edit

export function Informe_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalInformeEdit navigate={navigate} params={p} />
        </>
    );
}