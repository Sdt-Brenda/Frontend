import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';


export class InternalEstudioEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fecha: '',
            valores_referencia: '',
            codigo: '',
            codigoOptions: [],
            estudioHorarioOptions: [],
            selectedCodigo: '',
            selectedHorario: ''
        };
    }

    componentDidMount() {
        let codigoParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        };

        fetch('http://localhost:8080/api/codigo_estudio/codigo/nombre', codigoParams)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                const codigoOptions = data.map(item => ({
                    value: item.codigo,
                    label: item.nombre
                }));

                this.setState({ codigoOptions });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });


        if (this.props.params.id_estudio) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/estudio/${this.props.params.id_estudio}`, parametros)
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
                            console.log(result.body);
                            const fecha = new Date(result.body.fecha);
                            this.setState({
                                fecha: fecha,
                                horario: result.body.horario,
                                valores_referencia: result.body.valores_referencia,
                                codigo: result.body.codigo
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
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let estudio = {
            fecha: this.state.fecha,
            horario: this.state.horario,
            valores_referencia: this.state.valores_referencia,
            codigo: this.state.selectedCodigo
        }

        let parametros = {
            method: this.props.params.id_estudio ? 'PUT' : 'POST',
            body: JSON.stringify(estudio),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = this.props.params.id_estudio ? `http://localhost:8080/api/estudio/edit/${this.props.params.id_estudio}` : `http://localhost:8080/api/estudio/${this.props.params.id_paciente}`

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
                            this.props.navigate("/estudio")
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
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCodigoSelection = (selectedCodigo) => {
        const codigo = selectedCodigo.target.value;
        this.setState({ selectedCodigo: codigo });

        if (codigo) {
            let params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            };
            fetch(`http://localhost:8080/api/estudio/horario/${codigo}`, params)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Create options with id_horario as value and horario as label
                    const estudioHorarioOptions = data.map(item => ({
                        value: item.id_horario,
                        label: item.horario
                    }));
                    this.setState({ estudioHorarioOptions });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            this.setState({ estudioHorarioOptions: [] });
        }
    };

    handleDateChange = (date) => {
        this.setState({ fecha: date });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.id_estudio ? `Editar cita para Estudio ${this.props.params.id_estudio}` : "Crear nueva cita para Estudio"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id='floatingCodigo'
                                    value={this.state.selectedCodigo}
                                    name='codigo'
                                    onChange={this.handleCodigoSelection}
                                >
                                    <option value="" disabled>Seleccione el Estudio</option>
                                    {this.state.codigoOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="floatingCodigo">Estudio</label>
                            </div>
                            <br />
                            <div className="mb-3">
                                <label htmlFor="sele">Seleccione una fecha:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    id="selectedFecha"
                                    name='fecha'
                                    selected={this.state.fecha}
                                    onChange={this.handleDateChange}
                                    minDate={new Date()}
                                    locale={es}
                                />
                            </div>
                            <br />
                            <div className="mb-3">
                                <label htmlFor="horario">Horarios Disponibles:</label>
                                <select
                                    className="form-select"
                                    id="horario"
                                    onChange={this.handleChange}
                                    value={this.state.horario}
                                    name="horario"
                                >
                                    <option value="" disabled>
                                        Seleccione un horario
                                    </option>
                                    {this.state.estudioHorarioOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingValoresReferencia'
                                    value={this.state.valores_referencia}
                                    name='valores_referencia'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingValoresReferencia">Valores de Referencia</label>
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

export default Estudio_Edit

export function Estudio_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalEstudioEdit navigate={navigate} params={p} />
        </>
    );
}
