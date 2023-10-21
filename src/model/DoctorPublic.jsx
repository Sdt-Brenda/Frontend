import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export class DoctorPublic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doctor: [],
            modal: false,
        };
    }

    componentDidMount() {
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token'),
            },
        };

        fetch('http://localhost:8080/api/doctor/public', parametros)
            .then((res) => {
                return res.json().then((body) => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body,
                    };
                });
            })
            .then(
                (result) => {
                    if (result.ok) {
                        this.setState({
                            doctor: result.body,
                        });
                    } else {
                        toast.error(result.body.message, {
                            position: 'bottom-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const filas = this.state.doctor.map((doctor, index) => {
            return (
                <tr key={index}>
                    <td>{doctor.apellido} {doctor.nombre}</td>
                    <td>{doctor.especialidad}</td>
                    <td>{doctor.dias_trabaja}</td>
                    <td>{doctor.primer_horario} - {doctor.ultimo_horario}</td>
                </tr>
            );
        });

        return (
            <>
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Especialidad</th>
                                <th>Días de Atención</th>
                                <th>Horarios de Atención</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas}
                        </tbody>
                    </table>
                    <br />
                    <Link to='/registrarse' className='btn btn-info'>
                        Registrarse y Buscar turnos
                    </Link>
                    <Link to='/' className='btn btn-info'>
                        <span className='material-symbols-outlined'>arrow_back_ios</span>
                    </Link>
                </div>
            </>
        );
    }
}

export default DoctorPublic;