import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

export class CodEstudioxd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codigo: '',
            descripcion: '',
            datos: []
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

        const cd_estudio = {
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
        };
        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(cd_estudio),
            
        };

        fetch(`http://localhost:8080/api/codigo_estudio`, parametros)
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
            const url = `http://localhost:8080/api/codigo_estudio/`

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
                                            datos: result.body
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
                const url = `http://localhost:8080/api/codigo_estudio/${this.state.idToDelete}`
    
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
        const filas = this.state.datos.map((datos, index) => {
            return (
                <>
                <tr key={index}>
                    <td>{datos.codigo}</td>
                    <td>{datos.descripcion}</td>

                    <td>
                        <Link to={`/codigo_estudio/edit/${datos.codigo}`} className="btn btn-secondary">
                            <span className="material-symbols-outlined">
                                edit
                            </span></Link>
                        <button className="btn btn-danger" onClick={() => this.showModal(datos.codigo)} >
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
                        <h1>Crear Estudio</h1>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingcodigo'
                                    value={this.state.codigo}
                                    name='codigo'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingcodigo">Codigo de estudio</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id='floatingdescripcion'
                                    value={this.state.descripcion}
                                    name='descripcion'
                                    onChange={this.handleChange} />
                                <label htmlFor="floatingdescripcion">Descripcion</label>
                            </div>
                            <br/>
                            <input
                                className='btn btn-outline-primary'
                                type='submit'
                                value='Crear'
                            />
                        </form>
                        <br />
                        <Link to={`/codigo_estudio/`} className="btn btn-outline-danger" onClick={this.handleClickTodos}>Listar Analisis</Link>
                        <br />
                        <div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Descripcion</th>
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

export default CodEstudio


export function CodEstudio() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <CodEstudioxd navigate={navigate} params={p} />
        </>
    );
}