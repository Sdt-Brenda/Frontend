import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InformeE extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_informe:'',
            observaciones: '',
            id_estudio: '',
            id_historia_clinica: '',
            datosextras: [],
        };
    }

    componentDidMount() {

        const url = `http://localhost:8080/api/informe`;

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        fetch(url, parametros)
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
                            datosextras: result.body,
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
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let Informex = {
            observaciones: this.state.observaciones,
            id_estudio: this.state.id_estudio,
            id_historia_clinica: this.state.id_historia_clinica,
        }

        let parametros = {
            method: 'PUT',
            body: JSON.stringify(Informex),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/informe/${this.props.params.id_informe}`


      
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
        const { datosextras } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{ `Editar Informe: ${this.props.params.id_informe}`}</h1>
                        {datosextras.map(datosextras => (
                        <form onSubmit={this.handleSubmit}>
                            <p>Observaciones</p>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingobservaciones'
                                    value={this.state.observaciones}
                                    name='observaciones'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingobservaciones">{datosextras.observaciones}</label>
                            </div>
                            <br />
                            <p>Id estudio</p>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_estudio'
                                    value={this.state.id_estudio}
                                    name='id_estudio'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_estudio">{datosextras.id_estudio}</label>
                            </div>
                            <br />
                            <p>Historia clinica</p><div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_historia_clinica'
                                    value={this.state.id_historia_clinica}
                                    name='id_historia_clinica'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_historia_clinica">{datosextras.id_historia_clinica}</label>
                            </div>
                            <br />
                            <input
                                className='btn btn-primary'
                                type='submit'
                                value='Guardar'
                            />
                        </form>
                        ))}</div>
                </div>
            </div>
        );
    }
}

export default InformeEdit


export function InformeEdit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InformeE navigate={navigate} params={p} />
        </>
    );
}