import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';


export class Historialxd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historiales: []
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

    handleSubmit = (event) => {
        event.preventDefault();



        const historialx = {
            id_usuarioP: this.state.id_usuarioP,
            id_turno: this.state.id_turno,
        };
        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(historialx),
            
        };

        fetch(`http://localhost:8080/api/historia_clinica`, parametros)
            .then((res) => {
                return res.json().then((body) => {debugger
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body,
                    };
                });
            })
            .then((result) => {
                if (result.ok) {
                    toast.success(result.body.message, {
                        position: 'bottom-center',
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    // this.props.navigate("/usuario")    Podria ir a usuario o recargar la pag
                    //setTimeout(() => {
                    //window.location.reload() }, 500); // O podria poner un reload y IZI
                    this.handleClickTodos();
                } else {
                    toast.error(result.body.message, {
                        position: 'bottom-center',
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };
    

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClickTodos = () => {

            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            const url = `http://localhost:8080/api/historia_clinica`

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
                                        historiales: result.body
                                    });                                    
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
                const url = `http://localhost:8080/api/historia_clinica/${this.state.idToDelete}`
    
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
                                        this.handleClickTodos();
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

    render() {
        const filas = this.state.historiales.map((historiales, index) => {
            return (
                <>
                <tr key={index}>
                    <td>{historiales.id_historia_clinica}</td>
                    <td>{historiales.id_usuarioP}</td>
                    <td>{historiales.id_turno}</td>

                    <td>
                        <Link to={`/historia_clinica/edit/${historiales.id_historia_clinica}`} className="btn btn-secondary">
                            <span className="material-symbols-outlined">
                                edit
                            </span></Link>
                        <button className="btn btn-danger" onClick={() => this.showModal(historiales.id_historia_clinica)} >
                            <span className="material-symbols-outlined">
                                delete
                            </span></button>
                    </td>
                </tr>
                
                </>
            )
        })
        
        return (
            <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Crear una Historia Clinica</h1>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_usuarioP'
                                    value={this.state.id_usuarioP}
                                    name='id_usuarioP'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_usuarioP">id_usuarioP</label>
                            </div>
                            <br/>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingid_turno'
                                    value={this.state.id_turno}
                                    name='id_turno'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingid_turno">Id Turno</label>
                            </div>
                            <br/>
                            <input
                                className='btn btn-outline-primary'
                                type='submit'
                                value='Crear'
                            />
                        </form>
                        <br />
                        <Link to={`/historia_clinica/`} className="btn btn-outline-danger" onClick={this.handleClickTodos}>Get All Obras</Link>
                        <br />
                        <div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>id_historia_clinica</th>
                                        <th>id_usuarioP</th>
                                        <th>id_turno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filas}
                                </tbody>
                            </table>
                        </div>
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

export default Historial


export function Historial() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Historialxd navigate={navigate} params={p} />
        </>
    );
}