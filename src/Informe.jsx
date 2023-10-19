import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';



export class Informexd extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            informe: [],
            filters: null,
            globalFilterValue: '',
        };

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

    showModal(codigo) {
        this.setState({
            modal: true,
            idToDelete: codigo
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount = () => {
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/api/informe`
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
                                this.setState({
                                    informe: result.body
                                });
                                this.initFilters();
                            }
                            else {
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
    };

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
            const url = `http://localhost:8080/api/informe/${this.state.idToDelete}`

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
                                        autoClose: 500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    this.closeModal();
                                    window.location.reload();
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
                <Link to={`/informe/edit/${rowData.id_informe}`} className="btn btn-secondary">
                    <span className="material-symbols-outlined">edit</span>
                </Link>
                <button className="btn btn-danger" onClick={() => this.showModal(rowData.id_informe)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </>
        );
    };





    render() {

        const header = this.renderHeader();
        const dataForDataTable = this.state.informe.map((informe, index) => {

            return {
                id_informe: informe.id_informe,
                observaciones: informe.observaciones,
                id_estudio: informe.id_estudio,
            };
        });


            return (
                <>
                    <div className="card2">
                    <DataTable value={dataForDataTable} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id"  filters={this.state.filters} 
                    globalFilterFields={['id_informe', 'observaciones', 'id_estudio']} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id_informe" header="id_informe" sortable style={{ width: '35%' }}></Column>
                        <Column field="observaciones" header="observaciones" sortable style={{ width: '35%' }}></Column>
                        <Column field="id_estudio" header="id_estudio" sortable style={{ width: '35%' }}></Column>
                        <Column field="Acciones" header="Acciones" sortable style={{ width: '35%' }} body={(rowData)  => (
                            <div className="btn-actions-container">
                                <Link to={`/informe/edit/${rowData.id_informe}`} className="btn btn-secondary">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                </Link>
                                <button className="btn btn-danger" onClick={() => this.showModal(rowData.id_informe)}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                </button>
                            </div>
                        )} />
                    </DataTable>
                </div>


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

export default Informe


export function Informe() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Informexd navigate={navigate} params={p} />
        </>
    );
}