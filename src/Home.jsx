import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';

export class Home extends Component {

    render() {
        return <>
            <h1>Bienvenido al sitio web del Consultorio Nosiglia </h1>
        </>

    }
}

export default Homee


export function Homee() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Home navigate={navigate} params={p} />
        </>
    );
}