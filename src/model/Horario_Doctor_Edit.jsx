import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalHorarioDoctorEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_horario: '',
            id_doctor: '',
            horarioOptions: []
        };
    }

    componentDidMount() {
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        };
        fetch(`http://localhost:8080/api/horario`, parametros)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ horarioOptions: data });
            })
    }


    handleChange = (event) => {
        this.setState({ id_horario: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let horarioDoctor = {
            id_horario: this.state.id_horario
        }
        let parametros = {
            method: 'POST',
            body: JSON.stringify(horarioDoctor),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }

        fetch(`http://localhost:8080/api/horario_doctor/${this.props.params.id_doctor}`, parametros)
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
                            this.props.navigate("/usuario")
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

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{"Actualizar Horarios"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="id_horario">Select a Horario:</label>
                            <select
                                id="id_horario"
                                name="id_horario"
                                value={this.state.id_horario}
                                onChange={this.handleChange}
                            >
                                <option value="">Select a Horario</option>
                                {this.state.horarioOptions.map(option => (
                                    <option key={option.id_horario} value={option.id_horario}>
                                        {option.horario}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <input className='btn btn-primary' type='submit' value='Guardar' />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Horario_Doctor_Edit;

export function Horario_Doctor_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalHorarioDoctorEdit navigate={navigate} params={p} />
        </>
    );
}