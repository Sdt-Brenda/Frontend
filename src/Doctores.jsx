
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

export class Doctores extends Component {
  constructor(props) {
    super(props)
    const currentDayOfWeek = new Date().getDay();

    this.state = {
      especialidadD: [],
      selectedEspecialidad: '',
    }
  }



  handleEspecialidadSelection = (selectedEspecialidad) => {
    const especialidad = selectedEspecialidad.target.value;
    this.setState({ selectedEspecialidad: especialidad });   

    const selectedValue = selectedEspecialidad.target.value;
    if (!this.state.firstOptionDisabled) {
      this.setState({ firstOptionDisabled: true });
    }
    this.setState({ selectedEspecialidad: selectedValue });
  
    if (especialidad) {
      const url = `http://localhost:8080/api/doctor/${especialidad}`;

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
                    this.setState({
                      especialidadD: result.body,
                    });
                  } else {
                    this.setState({
                      especialidadD: [], // Configurar como un array vacío si no hay resultados
                    });
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
  };

  render() {
    const { especialidadD } = this.state;
    
    return (
      <>

      <div className="mb-3">
        <h2>Seleccione una especialidad para seguir</h2>
            <select
              className="form-select"
              id="especialidad"
              onChange={this.handleEspecialidadSelection}
              value={this.state.selectedEspecialidad}
              name="especialidad"
              aria-label="Select a specialty">
              <option value="" disabled={this.state.firstOptionDisabled}>¿Qué especialidad busca?</option>
              <option value="neurologia">Neurología</option>
              <option value="cardiologia">Cardiología</option>
            </select>
          </div>
          <div className="doctores-container">
          {especialidadD.map(doctor => (
            <div className="card" key={doctor.id_doctor}>
              <img src="https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-medico-dibujado-mano_23-2150682053.jpg" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{doctor.especialidad}</h5>
                <p className="card-text">ID Doctor: {doctor.id_doctor}</p>
                <p className="card-text">Dias que Trabaja: {doctor.dias_trabaja}</p>
                <p className="card-text">Horario que trabaja: {doctor.horario_trabaja}</p>
                <p className="card-text">ID Usuario: {doctor.id_usuario}</p>
                <p className="card-text">ID Rol: {doctor.id_rol}</p>
                <Link to={`/doctor/edit/${doctor.id_doctor}`} className="btn btn-primary">Ir al Doctor</Link>
                <Link to={`/turnos/${doctor.id_usuario}`} className="btn btn-primary">Turnos</Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

}

export default Doctores