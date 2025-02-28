import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrarDestinatario() {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: '', tipo: '' }), 3000);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (usuarios.some(u => u.email === email)) {
            mostrarAlerta('El destinatario ya existe.', 'danger');
            return;
        }
        usuarios.push({ email, saldo: 0, movimientos: [] });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarAlerta('Destinatario registrado con éxito.', 'success');
        setEmail('');
    };

    return (
        <div className="container">
            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo}`} role="alert">
                    {alerta.mensaje}
                </div>
            )}
            <h2 className="text-center">Registrar Destinatario</h2>
            <form id="registroForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email del destinatario</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
            <Link to="/transacciones" className="btn btn-secondary mt-3 w-100">Volver a Transacciones</Link>
        </div>
    );
}

export default RegistrarDestinatario;