import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';


import styles from "../styles/Components.module.css";

export class Doctor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            doctor: [],
            modal: false,
            filters: null,
            globalFilterValue: '',
        }

        this.clearFilter = this.clearFilter.bind(this);
        this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);
        this.initFilters = this.initFilters.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    closeModal() {
        this.setState({
            modal: false,
            idToDelete: null
        })
    }

    showModal(id_doctor) {
        this.setState({
            modal: true,
            idToDelete: id_doctor
        })
    }

    componentDidMount() {
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        fetch("http://localhost:8080/api/doctor", parametros)
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
                            doctor: result.body
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

    handleClickDelete() {
        if (this.state.idToDelete) {
            let parametros = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            fetch(`http://localhost:8080/api/doctor/${this.state.idToDelete}`, parametros)
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
                                    this.closeModal();
                                    this.componentDidMount();
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
                }
                );
        }
    };

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
                {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={this.clearFilter} /> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={this.state.globalFilterValue} onChange={this.onGlobalFilterChange} placeholder="Buscar" />
                </span>
            </div>
        );
    }



    renderAcciones = (rowData) => {
        return (
            <>
                <Link to={`/doctor/edit/${rowData.id_doctor}`}  title="Editar Doctor" className="btn btn-secondary">
                    <span className="material-symbols-outlined">edit</span>
                </Link>
                <button className="btn btn-danger" title="Eliminar Doctor" onClick={() => this.showModal(rowData.id_doctor)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </>
        );
    };


    render() {


        const header = this.renderHeader();
        const dataForDataTable = this.state.doctor.map((doctor, index) => {

            return {
                id_doctor: doctor.id_doctor,
                nombre : doctor.nombre+ " " + doctor.apellido ,
                especialidad: doctor.especialidad,
                dias_trabaja: doctor.dias_trabaja,
                horario: doctor.primer_horario + "~" + doctor.ultimo_horario
            };
        });


        return (
            <>
                <div className="card2">
                <div className={styles.table_buttons}>
                <Link to="/doctor/create/">
                    <button className={styles.nuevo_button}>+ Doctor</button>
                </Link>
                <Link to="/doctores">
                    <button className={styles.nuevo_button}>Especialidades</button>
                </Link>
                </div>
                    <DataTable value={dataForDataTable} removableSort paginator rows={10} rowsPerPageOptions={[10, 25, 50]} dataKey="id" filters={this.state.filters}
                        globalFilterFields={['id_doctor', 'especialidad', 'dias_trabaja']} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nombre" header="Nombre Y Apellido" sortable style={{ width: '25%' }}></Column>
                        <Column field="especialidad" header="especialidad" sortable style={{ width: '25%' }}></Column>
                        <Column field="dias_trabaja" header="dias_trabaja" sortable style={{ width: '25%' }}></Column>
                        <Column field="horario" header="Horarios" sortable style={{ width: '25%' }}></Column>
                        <Column field="Acciones" header=""  style={{ width: '25%' }} body={(rowData) => (
                            <div className="btn-actions-container">
                                <Link to={`/doctor/edit/${rowData.id_doctor}`} title="Editar Doctor" rel="tooltip" className="btn btn-secondary">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                </Link>
                                <button className="btn btn-danger" title="Eliminar Doctor" onClick={() => this.showModal(rowData.id_doctor)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                </button>
                            </div>
                        )} />
                    </DataTable>
                </div>
                <br />

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro que desea eliminar este doctor?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.handleClickDelete()}>
                            Eliminar
                        </Button>
                        <Button variant="primary" onClick={this.closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Doctor