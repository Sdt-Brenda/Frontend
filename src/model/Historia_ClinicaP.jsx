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

import jwt_decode from 'jwt-decode';

export class InternalHistoriaClinicaP extends Component {
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

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const id_usuario = decodedToken.id_usuario;
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': token
                }
            };
            const url = `http://localhost:8080/api/paciente/test/nada/${id_usuario}`;
            fetch(url, parametros)
            .then(res => {
                return res.json()
                    .then(body => (
                        {status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body})
                    ).then(
                        result => {
                    if (result.ok) {
                        const id_paciente = result.body[0].id_paciente;
                        let parametros = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'token': localStorage.getItem('token')
                            }
                        }
                        fetch(`http://localhost:8080/api/estudio/paciente/${id_paciente}`, parametros)
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
                            )
                    

                    } else {
                        console.log("error");
                    }
            })})
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
                    <DataTable value={dataForDataTable} removableSort paginator rows={10} rowsPerPageOptions={[10, 25, 50]} dataKey="id"  filters={this.state.filters} 
                    globalFilterFields={['nombre', 'codigo', 'valores_referencia', 'observaciones']} header={header} emptyMessage="Nada Encontrado" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nombre" header="Nombre" sortable style={{ width: '10%' }}></Column>
                        <Column field="codigo" header="codigo" sortable style={{ width: '10%' }}></Column>
                        <Column field="valores_referencia" header="valores_referencia" sortable style={{ width: '10%' }}></Column>
                        <Column field="observaciones" header="observaciones" sortable style={{ width: '10%' }}></Column>
                    </DataTable>
                </div>
        </>
        );
    }
}


export default Historia_ClinicaP

export function Historia_ClinicaP() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <InternalHistoriaClinicaP navigate={navigate} params={p} />
        </>
    );
}