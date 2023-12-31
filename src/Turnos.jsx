import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';


export class Turnos_Internal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null,
            globalFilterValue: '',
            turnos: [],
            id_usuarioP: "",
            estudio: [],
        }

        this.calculateTimeToTurn = this.calculateTimeToTurn.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);
        this.initFilters = this.initFilters.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            const id_usuario = decodedToken.id_usuario;
            const rol = decodedToken.rol;
            if (rol === 3) {
                const url = `http://localhost:8080/api/turno_medico/datos/${id_usuario}`;
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
                            } this.initFilters();
                        }
                    ).catch(
                        (error) => { console.log(error) }
                    );
                    let parametros2 = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    }
                    fetch("http://localhost:8080/api/estudio", parametros2)
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
                                        estudio: result.body
                                    });
                                    this.initFilters();
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
            else {
                const url = `http://localhost:8080/api/turno_medico/`;
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
                                const filteredTurnos = result.body;
                                this.setState({
                                    turnos: filteredTurnos,
                                });
                                this.initFilters();
                            } else {
                            }
                        }
                    ).catch(
                        (error) => { console.log(error) }
                    );
                    let parametros2 = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    }
                    fetch("http://localhost:8080/api/estudio", parametros2)
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
                                        estudio: result.body
                                    });
                                    this.initFilters();
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
        }
    }

    clearFilter() {
        this.initFilters();
    }

    onGlobalFilterChange(e) {
        const value = e.target.value;
        let _filters = { ...this.state.filters };
        _filters['global'].value = value;
        this.setState({
            filters: _filters,
            globalFilterValue: value,
        });
    }

    initFilters() {
        this.setState({
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            globalFilterValue: '',
        });
    }

    renderHeader() {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={this.state.globalFilterValue} onChange={this.onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    }



    calculateTimeToTurn(turnos) {
        const currentEpochTime = new Date().getTime() / 1000;
        const turnoDateTimeString = `${turnos.fecha.slice(0, -14)} ${turnos.horario}`;
        const turnoEpochTime = new Date(turnoDateTimeString).getTime() / 1000;
        const tiempoRestante = turnoEpochTime - currentEpochTime;

        if (tiempoRestante < 0) {
            return "Turno ya gestionado";
        } else {
            const horas = Math.floor(tiempoRestante / 3600);
            const minutos = Math.floor((tiempoRestante % 3600) / 60);
            return `Falta ${horas} horas ${minutos} minutos`;
        }
    }




    render() {
        const { turnos } = this.state;
        const { estudio } = this.state;
        const decodedToken = jwt_decode(localStorage.getItem('token'));
        const rol = decodedToken.rol;

        if (rol === 3) {
            return (
                <>
                    <div>
                        <div className="doctores-container">
                            {turnos.map(turnos => (
                                <div className="card" key={turnos.id_doctor}>
                                    <img src="data:image/png;base64,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" className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{"Turno Medico"}</h5>
                                        <p className="card-text">Fecha {turnos.fecha.slice(0, -14)}</p>
                                        <p className="card-text">Hora {turnos.horario}</p>
                                        <p className="card-text">Tiempo restante: {this.calculateTimeToTurn(turnos)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="doctores-container">
                            {estudio.map(estudio => (
                                <div className="card" key={estudio.id_doctor}>
                                    <img src="data:image/png;base64,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" className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{"Turno Clinico"}</h5>
                                        <p className="card-text">Fecha {estudio.fecha.slice(0, -14)}</p>
                                        <p className="card-text">Hora {estudio.horario}</p>
                                        <p className="card-text">Tiempo restante: {this.calculateTimeToTurn(estudio)}</p>
                                        <p className="card-text">Sintomas: {estudio.valores_referencia}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>);
        } else {
            const header = this.renderHeader();
            const dataForDataTable = this.state.turnos.map((turnos, index) => {

                return {
                    id_turno: turnos.id_turno,
                    fecha: turnos.fecha.slice(0, -14),
                    horario: turnos.horario,
                    sintomas: turnos.sintomas,
                    id_doctor: turnos.id_doctor,
                    id_usuarioP: turnos.id_usuarioP,
                };
            });

            return (
                <>
                    <Link to="/calendario" className="btn btn-info">Ir al Calendario</Link>
                    <div className="card2">
                        <DataTable value={dataForDataTable} removableSort paginator rows={10} rowsPerPageOptions={[10, 25, 50]} dataKey="id" filters={this.state.filters}
                            globalFilterFields={['id_turno', 'fecha', 'horario', 'sintomas', 'id_doctor', "id_usuarioP"]} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                            <Column field="id_turno" header="id_turno" sortable style={{ width: '10%' }}></Column>
                            <Column field="fecha" header="fecha" sortable style={{ width: '10%' }}></Column>
                            <Column field="horario" header="horario" sortable style={{ width: '10%' }}></Column>
                            <Column field="sintomas" header="Sintomas" sortable style={{ width: '10%' }}></Column>
                            <Column field="id_doctor" header="Id Doctor" sortable style={{ width: '10%' }}></Column>
                            <Column field="id_usuarioP" header="Id Usuario" sortable style={{ width: '10%' }}></Column>
                        </DataTable>
                    </div>
                </>
            );

        }
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



