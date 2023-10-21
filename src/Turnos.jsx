import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';


export class Turnos_Internal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnos: [],
            id_usuarioP: "",
        }
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            const id_usuario = decodedToken.id_usuario;
            const rol = decodedToken.rol;
            if (rol === 3) {

        const url =  `http://localhost:8080/api/turno_medico/datos/${id_usuario}`;
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
                        const { id_usuarioP } = this.props.params;
                        const filteredTurnos = id_usuarioP
                            ? result.body.filter((turno) => turno.id_doctor === parseInt(id_usuarioP))
                            : result.body;
                        this.setState({
                            turnos: filteredTurnos,
                        });
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
        }
        else {
            const url =  `http://localhost:8080/api/turno_medico/`;
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
                            const { id_usuarioP } = this.props.params;
                            const filteredTurnos = id_usuarioP
                                ? result.body.filter((turno) => turno.id_doctor === parseInt(id_usuarioP))
                                : result.body;
                            this.setState({
                                turnos: filteredTurnos,
                            });
        
                        } else {
                        }
                    }
                ).catch(
                    (error) => { console.log(error) }
                );
    }
    }
}


    render() {
        const { turnos } = this.state;

        return (
            <>
                <div>
                    <div className="doctores-container">
                        {turnos.map(turnos => (
                            <div className="card" key={turnos.id_doctor}>
                                <img src="data:image/png;base64,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" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{turnos.especialidad}</h5>
                                    <p className="card-text">Id del Turno: {turnos.id_turno}</p>
                                    <p className="card-text">Fecha {turnos.fecha.slice(0, -14)}</p>
                                    <p className="card-text">Hora {turnos.horario}</p>
                                    <p className="card-text">Observaciones: {turnos.observaciones}</p>
                                    <p className="card-text">Usuario Doctor: {turnos.id_doctor}</p>
                                    <p className="card-text">Usuario Paciente: {turnos.id_usuarioP}</p>
                                    {/* <Link to={`/doctor/edit/${turnos.id_doctor}`} className="btn btn-primary">Ir al Doctor</Link>
                                    <Link to={`/paciente/edit/${turnos.id_usuarioP}`} className="btn btn-primary">Ir al Paciente</Link> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>);

    }
}

export default Turnos

export function Turnos() {
    const p = useParams();

    return (
        <>
            <Turnos_Internal params={p} />
        </>
    )
}



