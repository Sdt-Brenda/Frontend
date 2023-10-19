import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';


export class Pacientexd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pacientes: [],
            usuarios_P: [],
            id_paciente: "",
        };        
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
            const url = `http://localhost:8080/api/usuario/test/rol`
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
                                    usuarios_P: result.body,
                                    });console.log(result.body)                                   
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
    
    render() {
        const filas = this.state.usuarios_P.map((usuarios_P, index) => {
            return (
                <>
                <tr key={index}>
                    <td>{usuarios_P.id_usuario}</td>
                    <td>{usuarios_P.nombre}</td>
                    <td>{usuarios_P.apellido}</td>
                    <td>{usuarios_P.dni}</td>
                    <td>{usuarios_P.fecha_nacimiento}</td>
                    <td>{usuarios_P.email}</td>
                    <td>{usuarios_P.genero}</td>

                    <td>{this.state.pacientes.length > 0 && (
                    <Link to={`/paciente/edit/${usuarios_P.id_paciente}`} className="btn btn-secondary">
                            <span className="material-symbols-outlined">
                                nada
                            </span></Link>
                            )}
                    </td>
                </tr>
                
                </>
            )
        })
        return (
            <>
            <div className="container">
                <div className="row">
                        
                        <br />
                        <Link to={`/paciente_admin/`} className="btn btn-outline-danger" onClick={this.handleClickTodos}>Get All Obras</Link>
                        <br />
                        <div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>id_usuario</th>
                                        <th>nombre</th>
                                        <th>apellido</th>
                                        <th>dni</th>
                                        <th>fecha_nacimiento</th>
                                        <th>email</th>
                                        <th>genero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filas}
                                </tbody>
                            </table>
                        </div>
                    </div>
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

export default Paciente


export function Paciente() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Pacientexd navigate={navigate} params={p} />
        </>
    );
}