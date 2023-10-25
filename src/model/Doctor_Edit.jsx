import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

import styles from "../styles/Form.module.css";
import Titulo from "../components/Titulo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export class InternalDoctorEdit extends Component {
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
            id_especialidad: '',
            especialidad: '',
            dias_trabaja: '',
            id_doctor: '',
            id_usuario: '',
            id_horario: '',
            especialidadOptions: [],
            selectedOption: '',
            horarioOptions: [],
            selectedDias: [],
            DiasOptions: [],
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
        if (this.props.params.id_doctor) {
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/doctor/edit/${this.props.params.id_doctor}`, parametros) // Este GET no esta trayendo la información sobre los horarios, habria que actualizar la query en el backend.
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
                                apellido: result.body.detail.apellido,
                                dni: result.body.detail.dni,
                                genero: result.body.detail.genero,
                                email: result.body.detail.email,
                                password: result.body.detail.password,
                                id_usuario: result.body.detail.id_usuario,
                                id_especialidad: result.body.detail.id_especialidad,
                                dias_trabaja: result.body.detail.dias_trabajas
                            });
                        } else {
                            toast.error(result.body.message, this.toastConfig);
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
                const especialidadOptions = data.map((row) => ({
                    value: row.id_especialidad,
                    label: row.especialidad,
                }));
                this.setState({ especialidadOptions });
            })
            .catch((error) => {
                console.error('Error fetching especialidad options:', error);
            });
        let parametrosHorario = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        };

        fetch(`http://localhost:8080/api/horario`, parametrosHorario)
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
                this.setState({ horarioOptions });
            })
            .catch((error) => {
                console.error('Error fetching horario options:', error);
            });
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
            id_usuario: this.state.id_usuario
        }

        let parametrosU = {
            method: this.props.params.id_doctor ? 'PUT' : 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        const url = this.props.params.id_doctor ? `http://localhost:8080/api/usuario/${this.state.id_usuario}` : "http://localhost:8080/api/usuario/doctor"
        fetch(url, parametrosU)
            .then(res => {
                return res.json()
                    .then(body => (
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
                    let parametrosG = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    };
                    fetch(`http://localhost:8080/api/usuario/email/${usuario.email}`, parametrosG)
                        .then((res) => {
                            return res.json().then((body) => ({
                                status: res.status,
                                ok: res.ok,
                                headers: res.headers,
                                body: body,
                            }));
                        }).then((data) => {
                            if (data.ok) {
                                const idUsuario = data.body.id_usuario;
                                this.setState({ id_usuario: idUsuario });

                                let doctor = {
                                    id_especialidad: this.state.id_especialidad,
                                    dias_trabaja: this.state.selectedDias.join(' , '),
                                    id_usuario: idUsuario
                                }

                                let parametrosD = {
                                    method: this.props.params.id_doctor ? 'PUT' : 'POST',
                                    body: JSON.stringify(doctor),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'token': localStorage.getItem('token')
                                    }
                                }

                                const url2 = this.props.params.id_doctor ? `http://localhost:8080/api/doctor/${this.props.params.id_doctor}` : `http://localhost:8080/api/doctor/${idUsuario}`;

                                fetch(url2, parametrosD)
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
                                                if (result.ok && !this.props.params.id_doctor) {
                                                    toast.success(result.body.message, this.toastConfig);
                                                    let parametrosD = {
                                                        method: 'GET',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Accept': 'application/json',
                                                            'token': localStorage.getItem('token')
                                                        }
                                                    };
                                                    fetch(`http://localhost:8080/api/doctor/new/${idUsuario}`, parametrosD) //Acá recupero el ID_DOCTOR.
                                                        .then((res) => {
                                                            return res.json().then((body) => ({
                                                                status: res.status,
                                                                ok: res.ok,
                                                                headers: res.headers,
                                                                body: body,
                                                            }));
                                                        })
                                                        .then((data) => {
                                                            if (data.ok) {
                                                                const idDoctor = data.body[0].id_doctor;
                                                                this.setState({ id_doctor: idDoctor });
                                                                let horarioDoctor = {
                                                                    id_horario: this.state.selectedHorarioOption.map(option => option.value),
                                                                    id_doctor: idDoctor
                                                                }

                                                                let parametrosH = {
                                                                    method: 'POST',
                                                                    body: JSON.stringify(horarioDoctor),
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'token': localStorage.getItem('token')
                                                                    }
                                                                }
                                                                fetch(`http://localhost:8080/api/horario_doctor/`, parametrosH)
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
                                                                                    toast.success(result.body.message, this.toastConfig);
                                                                                } else {
                                                                                    toast.error(result.body.message, this.toastConfig);
                                                                                }
                                                                            });
                                                                    })
                                                                this.props.navigate("/doctor")
                                                            } else {
                                                                toast.error(result.body.message, this.toastConfig);
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.log('Error:', error);
                                                            toast.error('An error occurred during user creation.', this.toastConfig);
                                                        });
                                                } else {
                                                    let horarioDoctor = {
                                                        id_horario: this.state.selectedHorarioOption.map(option => option.value)
                                                    }
                                                    let parametrosH = {
                                                        method: 'PUT',
                                                        body: JSON.stringify(horarioDoctor),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'token': localStorage.getItem('token')
                                                        }
                                                    }

                                                    fetch(`http://localhost:8080/api/horario_doctor/${this.props.params.id_doctor}`, parametrosH)
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
                                                                        toast.success(result.body.message, this.toastConfig);
                                                                        this.props.navigate("/doctor")
                                                                    } else {
                                                                        toast.error(result.body.message, this.toastConfig);
                                                                    }
                                                                });
                                                        })
                                                }
                                            })
                                    });
                            };
                        }
                        );

                } else {
                    toast.error(result.body.message, this.toastConfig);
                }
            })
    }



    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleEspecialidadChange = (selectedOption) => {
        this.setState({ id_especialidad: selectedOption.value });
    };

    handleHorarioChange = (selectedOptions) => {
        this.setState({ selectedHorarioOption: selectedOptions });
    };

    handleDateChange = (date) => {
        this.setState({ fecha_nacimiento: date });
    };


    handleDiasChange = (selectedOptions) => {
        const selectedDias = selectedOptions.map(option => option.value);
        this.setState({ selectedDias });
    };





    render() {
        const animatedComponents = makeAnimated();

        const dias2 = [
            { dias: 'lunes' },
            { dias: 'martes' },
            { dias: 'miércoles' },
            { dias: 'jueves' },
            { dias: 'viernes' },
        ];

        return (

            <div clssName={styles.Bground}>
                <div className={styles.container}>
                    <div className={styles.card_register}>

                        <a href="/" className={styles.homeButton}>
                            <ArrowBackIcon></ArrowBackIcon>
                        </a>

                        <Titulo style={{ fontFamily: 'Helvetica', color: 'black', fontSize: '2rem', fontWeight: 'bold', textAlign: 'left', paddingLeft: '10px', paddingTop: '10px' }}>
                        {this.props.params.id_doctor ? `Editar Doctor ${this.state.apellido} ${this.state.nombre}` : "Crear nuevo Doctor"}</Titulo>

                        <div className='container'>
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

                                <div className="form-floating">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id='floatingApellido'
                                        value={this.state.apellido}
                                        name='apellido'
                                        onChange={this.handleChange} />
                                    <label htmlFor="floatingApellido">Apellido</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id='floatingDNI'
                                        value={this.state.dni}
                                        name='dni'
                                        onChange={this.handleChange} />
                                    <label htmlFor="floatingDNI">DNI</label>
                                </div>

                                <div className={styles.mb3}>
                                    <div>
                                        <label>Fecha de Nacimiento</label>
                                        <DatePicker style={{ width: '400px' }}
                                            required
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            showMonthDropdown
                                            scrollableMonthDropdown
                                            showYearDropdown
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={150}
                                            selected={this.state.fecha_nacimiento}
                                            onChange={this.handleDateChange}
                                            maxDate={new Date()}
                                            minDate={new Date('1900-01-01')}
                                            locale={es}
                                        />
                                    </div>
                                </div>

                                <div className={styles.mb3}>
                                    <select
                                        required
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

                                <div className="form-floating">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id='floatingEmail'
                                        value={this.state.email}
                                        name='email'
                                        onChange={this.handleChange} />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        required
                                        type="password"
                                        className="form-control"
                                        id='floatingPassword'
                                        value={this.state.password}
                                        name='password'
                                        onChange={this.handleChange} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="form-floating">
                                    <Select
                                        required
                                        placeholder="Especialidad"
                                        options={this.state.especialidadOptions}
                                        onChange={this.handleEspecialidadChange}
                                        value={this.state.especialidadOptions.find(
                                            (option) => option.value === this.state.id_especialidad
                                        )}
                                    />
                                </div>
                                            <br />
                            <div className="form-floating">
                                <label htmlFor="floatingHorario"></label>
                                <Select
                                    required
                                    placeholder="Selecciona días"
                                    value={this.state.selectedOptions}
                                    isMulti
                                    options={dias2.map((dias2) => ({
                                        value: dias2.dias,
                                        label: dias2.dias,
                                    }))}
                                    onChange={this.handleDiasChange}
                                    components={animatedComponents}
                                    closeMenuOnSelect={false}
                                />
                            </div>
                                <br />
                                <div className="form-floating">
                                    <label htmlFor="floatingHorario"></label>
                                    <Select
                                        required
                                        placeholder="Selecciona horarios"
                                        options={this.state.horarioOptions}
                                        value={this.state.selectedHorarioOption}
                                        onChange={this.handleHorarioChange}
                                        isMulti
                                        components={animatedComponents}
                                        closeMenuOnSelect={false}
                                    />
                                </div>

                                <input
                                    className={styles.btnPry}
                                    type='submit'
                                    value='Guardar'
                                />
                            </form>
                        </div>
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