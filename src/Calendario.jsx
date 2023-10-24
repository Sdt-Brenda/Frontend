import React, { Component } from "react";
import "./index.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";



class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnos: [],
        }
    }

    componentDidMount() {
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
                        this.setState({
                            turnos: result.body,
                        });
                    } this.initFilters();
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }



    render() {
        const turnos = this.state.turnos.map((turnos, index) => {


            return {
                title: turnos.horario,
                start: turnos.fecha.slice(0,-14),
                url: "http://localhost:3000/turnos/" + turnos.id_turnos,
            };

        });


        return (

            <div className="Calendario">
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin]}
                    events={turnos}
                />
            </div>
        );
    }
}

export default Calendario;
