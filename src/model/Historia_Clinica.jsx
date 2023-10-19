import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

export class InternalHistoriaClinica extends Component {
    constructor(props) {
        super(props)

        this.state = {
            estudio: [],
            modal: false,
            id_paciente:"",
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

    showModal(id_paciente) {
        this.setState({
            modal: true,
            idToDelete: id_paciente
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
        fetch(`http://localhost:8080/api/estudio/paciente/${this.props.params.id_paciente}`, parametros)
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
                    console.log(result.body);
                    if (result.ok) {
                        this.setState({
                            estudio: result.body
                        });
                        this.initFilters();
                    } else {
                        this.setState({
                            mensajeNoValores: "No hay valores para mostrar."
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
            fetch(`http://localhost:8080/api/paciente/${this.state.idToDelete}`, parametros)
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





    render(){
        const header = this.renderHeader();
        const dataForDataTable = this.state.estudio.map((estudio, index) => {


            return {
                nombre: estudio.nombre,
                codigo: estudio.codigo,
                valores_referencia: estudio.valores_referencia,
                observaciones: estudio.observaciones,
            };

        });

            return (<> 
                <div className="card2">
                    <DataTable value={dataForDataTable} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id"  filters={this.state.filters} 
                    globalFilterFields={['nombre', 'codigo', 'valores_referencia', 'observaciones']} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nombre" header="Nombre" sortable style={{ width: '10%' }}></Column>
                        <Column field="codigo" header="codigo" sortable style={{ width: '10%' }}></Column>
                        <Column field="valores_referencia" header="valores_referencia" sortable style={{ width: '10%' }}></Column>
                        <Column field="observaciones" header="observaciones" sortable style={{ width: '10%' }}></Column>
                    </DataTable>
                </div>
    
            <Modal show={this.state.modal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro que desea eliminar la historia clínica de este paciente?</Modal.Body>
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


export default Historia_Clinica

export function Historia_Clinica() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalHistoriaClinica navigate={navigate} params={p} />
        </>
    );
}