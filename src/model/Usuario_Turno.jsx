import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export class InternalUsuarioTurno extends Component {
    constructor(props) {
        super(props);
        const currentDayOfWeek = new Date().getDay();

        this.state = {
            calendarStartDay: currentDayOfWeek,
            selectedEspecialidad: '',
            doctorsWithSpecialty: [], //Este puede dar problemas.
            especialidadOptions: [],
            doctorDiasTrabaja: [],
            selectedDoctorId: '',
            selectedDay: '',
            selectedHorario: '',
            doctorHorarioOptions: [],
            idHorario: '',
            timeOptions: [],
            dias_trabaja: '',
            horario_trabaja: '',
            id_doctor: '',
            fecha: '',
            horario: '',
            sintomas: ''
        };
    }
    state = {
        timeOptions: [],
        selectedTime: null,
    };

    componentDidMount() {
        this.setState({ timeOptions: [] });
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
                })
        }
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        fetch(`http://localhost:8080/api/especialidad`, parametros)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ especialidadOptions: data });
            })
            .catch((error) => {
                console.error('Error fetching especialidad options:', error);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let turnoMedico = {
            id_usuarioP: this.props.params.id_usuario,
            id_doctor: this.state.selectedDoctorId,
            fecha: this.state.selectedDay,
            horario: this.state.horario,
            sintomas: this.state.sintomas
        };

        let parametros = {
            method: 'POST',
            body: JSON.stringify(turnoMedico),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        fetch(`http://localhost:8080/api/turno_medico`, parametros)
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
                            this.props.navigate("/usuario")
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

    handleEspecialidadSelection = (event) => {
        const especialidadConAcentos = event.target.value;
        const especialidad = quitarAcentos(especialidadConAcentos);
        this.setState({ selectedEspecialidad: especialidad }); // Asegúrate de que el estado se actualice correctamente
        // También, puedes agregar un console.log aquí para verificar el valor actual de selectedEspecialidad
        console.log("selectedEspecialidad:", this.state.selectedEspecialidad);

        let parametros2 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        if (especialidad) {
            fetch(`http://localhost:8080/api/doctor/${especialidad}`, parametros2)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.setState({ doctorsWithSpecialty: data });
                })
                .catch((error) => {
                    console.error('Error fetching doctors:', error);
                });
        } else {
            this.setState({ doctorDiasTrabaja: [] });
        }
    };

    handleDoctorSelection = (selectedDoctorId) => {
        this.setState({ selectedDoctorId });

        let parametros3 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        if (selectedDoctorId) {
            fetch(`http://localhost:8080/api/doctor/dias/${selectedDoctorId}`, parametros3)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const diasTrabajaString = data[0].dias_trabaja;
                    const diasTrabajaArray = diasTrabajaString.split(',').map(day => day.trim());
                    this.setState({ doctorDiasTrabaja: diasTrabajaArray });
                })
                .catch((error) => {
                    console.error('Error fetching doctor working days:', error);
                });
        } else {
            this.setState({ doctorDiasTrabaja: [] });
        }
    };

    handleDaySelection = (date) => {
        const selectedDoctorId = this.state.selectedDoctorId;
        this.setState({ selectedDay: date });

        let parametros4 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        if (selectedDoctorId && date) {
            fetch(`http://localhost:8080/api/doctor/horario/${selectedDoctorId}/${date.toISOString()}`, parametros4)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const horarioOptions = data.map((horario) => ({
                        value: horario.id_horario,
                        label: horario.horario,
                    }));
                    this.setState({ doctorHorarioOptions: horarioOptions });
                })
                .catch((error) => {
                    console.error('Error fetching doctor horarios:', error);
                });
        } else {
            this.setState({ doctorHorarioOptions: [] });
        }
    };


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{`Turno para el Usuario ${this.props.params.id_usuario}`}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="especialidad"
                                    onChange={this.handleEspecialidadSelection}
                                    value={this.state.selectedEspecialidad}
                                    name="selectedEspecialidad" // Debe coincidir con el nombre en el estado
                                    aria-label="Select a specialty"
                                >
                                    <option value="">
                                        ¿Qué especialidad busca?
                                    </option>
                                    {this.state.especialidadOptions.map((especialidad) => (
                                        <option key={especialidad.especialidad} value={especialidad.especialidad}>
                                            {especialidad.especialidad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="doctor">Seleccionar doctor:</label>
                                <select
                                    className="form-select"
                                    id="doctor"
                                    onChange={(event) => this.handleDoctorSelection(event.target.value)}
                                    value={this.state.selectedDoctorId}
                                    name="doctor"
                                >
                                    <option value="" disabled>
                                        Seleccione un doctor
                                    </option>
                                    {this.state.doctorsWithSpecialty.map((doctor) => (
                                        <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                            {doctor.nombre} {doctor.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="selectedDay">Seleccione una fecha:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    id="selectedDay"
                                    selected={this.state.selectedDay}
                                    onChange={(date) => this.handleDaySelection(date)}
                                    minDate={new Date()}
                                    filterDate={(date) => {
                                        const selectedDoctorWorkingDays = this.state.doctorDiasTrabaja;
                                        return selectedDoctorWorkingDays.includes(date.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase());
                                    }}
                                    weekStartsOn={1}
                                    locale={es}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="horario">Horario Disponibles:</label>
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
                                    {this.state.doctorHorarioOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingsintomas'
                                    value={this.state.sintomas}
                                    name='sintomas'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingsintomas">Síntomas</label>
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
        )
    }
}

export default Usuario_Turno


export function Usuario_Turno() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalUsuarioTurno navigate={navigate} params={p} />
        </>
    );
}