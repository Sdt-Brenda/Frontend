import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

export class InternalDoctorEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            especialidad: '',
            dias_trabaja: '',
            id_doctor: '',
            horario: [],
            especialidadOptions: [],
            horarioOptions: []
        };
    }

    componentDidMount() {
        if (this.props.params.id_doctor) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/doctor/edit/${this.props.params.id_doctor}`, parametros)
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
                                especialidad: result.body.detail.especialidad,
                                dias_trabaja: result.body.detail.dias_trabajas
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
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        };
        fetch(`http://localhost:8080/api/especialidad`, parametros)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const especialidadOptions = data.map((especialidad) => ({
                    value: especialidad.especialidad,
                    label: especialidad.especialidad,
                }));
                this.setState({ especialidadOptions });
            })
            .catch((error) => {
                console.error('Error fetching especialidad options:', error);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let doctor = {
            especialidad: this.state.especialidad,
            dias_trabaja: this.state.dias_trabaja
        }

        let parametros = {
            method: this.props.params.id_doctor ? 'PUT' : 'POST',
            body: JSON.stringify(doctor),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = this.props.params.id_doctor ? `http://localhost:8080/api/doctor/${this.props.params.id_doctor}` : `http://localhost:8080/api/doctor/${this.props.params.id_usuario}`

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
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            this.props.navigate("/doctor")
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

    handleEspecialidadChange = (selectedOption) => {
        this.setState({ especialidad: selectedOption.value });
    };


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.id_doctor ? `Editar Doctor ${this.props.params.id_doctor}` : "Crear nuevo Doctor"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <label></label>
                                <Select
                                    options={this.state.especialidadOptions}
                                    value={{ label: this.state.especialidad, value: this.state.especialidad }}
                                    onChange={this.handleEspecialidadChange}
                                />
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingDias_Trabaja'
                                    value={this.state.dias_trabaja}
                                    name='dias_trabaja'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingDias_Trabaja">Días de Atención</label>
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

export default Doctor_Edit

export function Doctor_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalDoctorEdit navigate={navigate} params={p} />
        </>
    );
}