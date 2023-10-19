import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

export class Usuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filters: null,
            globalFilterValue: '',
            usuario: [],
            modal: false
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

    showModal(id_usuario) {
        this.setState({
            modal: true,
            idToDelete: id_usuario
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


        fetch("http://localhost:8080/api/usuario", parametros)
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
                            usuario: result.body
                        }); 
                        this.initFilters();
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
                }
            ).catch(
                (error) => { console.log(error) }
            );
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
                {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={this.clearFilter} /> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={this.state.globalFilterValue} onChange={this.onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
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
            const url = `http://localhost:8080/api/usuario/${this.state.idToDelete}`

            fetch(url, parametros)
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
                                        autoClose: 5000,
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
                }
                );
        }
    };


    renderAcciones = (rowData) => {
        return (
            <>
                <Link to={`/usuario/edit/${rowData.id_usuario}`} className="btn btn-secondary">
                    <span className="material-symbols-outlined">edit</span>
                </Link>
                <Link to={`/usuario/historia_clinica/${rowData.id_usuario}`} className="btn btn-primary">
                    <span className="material-symbols-outlined">note</span>
                </Link>
                    <Link to={`/usuario/turno/${rowData.id_usuario}`} className="btn btn-info">
                        <span className="material-symbols-outlined">calendar_add_on</span>
                    </Link>
                <button className="btn btn-danger" onClick={() => this.showModal(rowData.id_usuario)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </>
        );
    };




    render() {
        const header = this.renderHeader();
        const dataForDataTable = this.state.usuario.map((usuario, index) => {
            const parsedDate = new Date(usuario.fecha_nacimiento);
            const formattedDate = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
            const todes = {
                1: "Femenino",
                2: "Masculino",
                3: "Otros",
            };
            const roles = {
                1: "ADMIN",
                2: "Doctor",
                3: "Paciente",
            };

            return {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                dni: usuario.dni,
                formattedDate: formattedDate,
                genero: todes[usuario.genero],
                email: usuario.email,
                rol: roles[usuario.rol],
                id_usuario: usuario.id_usuario,
            };

        });
        return (
            <>
                <div className="card2">
                    <DataTable value={dataForDataTable} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id"  filters={this.state.filters} 
                    globalFilterFields={['nombre', 'apellido', 'dni', 'formattedDate', 'genero', "email", "rol","id_usuario"]} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nombre" header="Nombre" sortable style={{ width: '10%' }}></Column>
                        <Column field="apellido" header="Apellido" sortable style={{ width: '10%' }}></Column>
                        <Column field="dni" header="Dni" sortable style={{ width: '10%' }}></Column>
                        <Column field="formattedDate" header="Fecha de Nacimiento" sortable style={{ width: '10%' }}></Column>
                        <Column field="genero" header="Genero" sortable style={{ width: '10%' }}></Column>
                        <Column field="email" header="Email" sortable style={{ width: '10%' }}></Column>
                        <Column field="rol" header="Rol" sortable style={{ width: '10%' }}></Column>
                        <Column field="id_usuario" header="Id" sortable style={{ width: '10%' }}></Column>
                        <Column field="Acciones" header="Acciones" sortable style={{ width: '10%' }} body={(rowData)  => (
                            <div className="btn-actions-container">
                                <Link to={`/usuario/edit/${rowData.id_usuario}`} className="btn btn-secondary">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                </Link>
                                <Link to={`/usuario/historia_clinica/${rowData.id_usuario}`} className="btn btn-primary">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>note</span>
                                </Link>
                                
                                <Link to={`/usuario/turno/${rowData.id_usuario}`} className="btn btn-info">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_add_on</span>
                                </Link>
                                <button className="btn btn-danger" onClick={() => this.showModal(rowData.id_usuario)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                </button>
                            </div>
                        )} />
                    </DataTable>
                </div>
                <Link to="/usuario/edit" className="btn btn-info">Nuevo Usuario</Link>

                
                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro que desea eliminar este usuario?</Modal.Body>
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


export default Usuario;