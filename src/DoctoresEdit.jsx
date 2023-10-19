import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import { Stack } from '@mui/material';


export class DoctoresE extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_doctor: '',
            especialidad: '',
            dias_trabaja: '',
            horario_trabaja: [],
            id_usuario: '',
            id_rol: '',
            horarios: [],
            selectedHorarios: [],
            dias: [],
            selectedDias: [],
        };
    }





    handleSubmit = (event) => {
        event.preventDefault();

        const horarioTrabaja = this.state.selectedHorarios.join(' , ');
        const diastrabaja = this.state.selectedDias.join(' , ')

        let doctoresx = {
            especialidad: this.state.especialidad,
            dias_trabaja: diastrabaja,
            horario_trabaja: horarioTrabaja,
        }

        let parametros = {
            method: 'PUT',
            body: JSON.stringify(doctoresx),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/doctor/${this.props.params.id_doctor}`

        fetch(url, parametros)
            .then(res => {
                debugger
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
                        debugger
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
                            this.props.navigate("/doctores")
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
        this.setState({ timeOptions: [] });
        const selectedValue = event.target.value;
        if (!this.state.firstOptionDisabled) {

            this.setState({ firstOptionDisabled: true });
        }
        this.setState({ selectedEspecialidad: selectedValue });
    }



    handleHorarioChange = (e) => {
        const selectedValue = e.target.value;
        if (!this.state.selectedHorarios.includes(selectedValue)) {
            this.setState((prevState) => ({
                selectedHorarios: [...prevState.selectedHorarios, selectedValue],
            }));
        }
    };

    handleCheckboxChange = (horarioId) => {
        const selectedHorarios = [...this.state.selectedHorarios];
        if (selectedHorarios.includes(horarioId)) {
            const index = selectedHorarios.indexOf(horarioId);
            selectedHorarios.splice(index, 1);
        } else {
            selectedHorarios.push(horarioId);
        }
        this.setState({ selectedHorarios });
    };

    handleDiasChange = (d) => {
        const selectedValue2 = d.target.value;
        if (!this.state.selectedDias.includes(selectedValue2)) {
            this.setState((prevState) => ({
                selectedDias: [...prevState.selectedDias, selectedValue2],
            }));
        }
    };

    handleCheckboxChange2 = (diasId) => {
        const selectedDias = [...this.state.selectedDias];
        if (selectedDias.includes(diasId)) {
            const index = selectedDias.indexOf(diasId);
            selectedDias.splice(index, 1);
        } else {
            selectedDias.push(diasId);
        }
        this.setState({ selectedDias });
    };


    render() {

        const horarios = [
            { id_horario: 1, horario: '8:00' },
            { id_horario: 2, horario: '8:20' },
            { id_horario: 3, horario: '8:40' },
            { id_horario: 4, horario: '9:00' },
            { id_horario: 5, horario: '9:20' },
            { id_horario: 6, horario: '9:40' },
            { id_horario: 7, horario: '10:00' },
            { id_horario: 8, horario: '10:20' },
            { id_horario: 9, horario: '10:40' },
            { id_horario: 10, horario: '11:00' },
            { id_horario: 11, horario: '11:20' },
            { id_horario: 12, horario: '11:40' },
            { id_horario: 13, horario: '12:00' },
            { id_horario: 14, horario: '12:20' },
            { id_horario: 15, horario: '12:40' },
            { id_horario: 16, horario: '13:00' },
            { id_horario: 17, horario: '13:20' },
            { id_horario: 18, horario: '13:40' },
            { id_horario: 19, horario: '14:00' },
            { id_horario: 20, horario: '14:20' },
            { id_horario: 21, horario: '14:40' },
            { id_horario: 22, horario: '15:00' },
            { id_horario: 23, horario: '15:20' },
            { id_horario: 24, horario: '15:40' },
            { id_horario: 25, horario: '16:00' },
            { id_horario: 26, horario: '16:20' },
            { id_horario: 27, horario: '16:40' },
            { id_horario: 28, horario: '17:00' },
            { id_horario: 29, horario: '17:20' },
            { id_horario: 30, horario: '17:40' },
            { id_horario: 31, horario: '18:00' },
        ];

        const dias2 = [
            { id_dias: 1, dias: 'lunes' },
            { id_dias: 2, dias: 'martes' },
            { id_dias: 3, dias: 'miercoles' },
            { id_dias: 4, dias: 'jueves' },
            { id_dias: 5, dias: 'viernes' },
        ];
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{`Editar la Especialides de este buen samaritano ${this.props.params.id_doctor}`}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="especialidad"
                                    onChange={this.handleChange} // Asegúrate de tener un manejador para la selección de la especialidad
                                    value={this.state.especialidad}
                                    name="especialidad"
                                    aria-label="Select a specialty"
                                >
                                    <option value="" disabled={this.state.firstOptionDisabled}>
                                        Selecciona una especialidad
                                    </option>
                                    <option value="neurologia">Neurología</option>
                                    <option value="cardiologia">Cardiología</option>
                                </select>
                            </div>
                            <br />
                            <div className="mb-3">
                                <label htmlFor="doctorhorario_trabaja">Horario de atención:</label>
                                <select class="form-select" size="5" value={this.state.selectedHorarios} onChange={this.handleHorarioChange} multiple>
                                    {horarios.map((id_horario) => (
                                        <option key={id_horario.horario} value={id_horario.horario}>
                                            <label>
                                                <input

                                                
                                                    type="checkbox"
                                                    checked={this.state.selectedHorarios.includes(id_horario.horario)}
                                                    onChange={() => this.handleCheckboxChange(id_horario.horario)}
                                                />
                                                {id_horario.horario}
                                            </label>
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="mb-3">
                                <label htmlFor="doctordias_trabaja">Dias de atención:</label>
                                <select class="form-select" size="5" value={this.state.selectedDias} onChange={this.handleDiasChange} multiple>
                                    {dias2.map((id_dias) => (
                                        <option key={id_dias.dias} value={id_dias.dias}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.selectedDias.includes(id_dias.dias)}
                                                    onChange={() => this.handleCheckboxChange2(id_dias.dias)}
                                                />
                                                {id_dias.dias}
                                            </label>
                                        </option>
                                    ))}
                                </select>
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

export default DoctoresEdit


export function DoctoresEdit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <DoctoresE navigate={navigate} params={p} />
        </>
    );
}