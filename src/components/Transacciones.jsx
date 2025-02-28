import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EliminarDestinatario from './EliminarDestinatario';

function Transacciones() {
    const [usuario, setUsuario] = useState(JSON.parse(sessionStorage.getItem('usuario')));
    const [usuarios, setUsuarios] = useState(JSON.parse(localStorage.getItem('usuarios')) || []);
    const [montoIngreso, setMontoIngreso] = useState('');
    const [montoTransferencia, setMontoTransferencia] = useState('');
    const [destinoEmail, setDestinoEmail] = useState('');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });
    const navigate = useNavigate();
    const [destinatarioAEliminar, setDestinatarioAEliminar] = useState('');
    const [mostrarAlertaEliminar, setMostrarAlertaEliminar] = useState(false);
    const [alertaEliminacion, setAlertaEliminacion] = useState({ mostrar: false, mensaje: '' });

    useEffect(() => {
        if (!usuario) {
            navigate('/');
            return;
        }
        actualizarSelectDestinatarios();
    }, [usuario, navigate]);

    const actualizarHistorial = () => {
        if (!usuario || !usuario.movimientos) {
            return []; 
        }
        return usuario.movimientos.map((mov, index) => (
            <li key={index} className="list-group-item bg-dark text-light">{mov}</li>
        ));
    };

    const actualizarDestinatarios = () => {
        return usuarios.map(u => (
            <li key={u.email} className="list-group-item bg-light d-flex justify-content-between align-items-center">
                {u.email}
                <EliminarDestinatario email={u.email} onEliminar={confirmarEliminacionDestinatario} />
            </li>
        ));
    };

    const actualizarSelectDestinatarios = () => {
        const select = document.getElementById('usuarioDestino');
        if (select) {
            select.innerHTML = '<option value="">Seleccionar destinatario</option>';
            usuarios.forEach(u => {
                const option = document.createElement('option');
                option.value = u.email;
                option.textContent = u.email;
                select.appendChild(option);
            });
        }
    };

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: '', tipo: '' }), 3000);
    };

    const ingresarDinero = () => {
        const monto = parseFloat(montoIngreso);
        if (monto > 0) {
            usuario.saldo += monto;
            usuario.movimientos.push(`Ingreso: +$${monto}`);
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            setUsuario({ ...usuario });
            setMontoIngreso('');
            mostrarAlerta(`Se ingresaron $${monto} con éxito.`, 'success');
        } else {
            mostrarAlerta('Monto inválido.', 'danger');
        }
    };

    const transferirDinero = () => {
        const monto = parseFloat(montoTransferencia);
        if (destinoEmail === '') {
            mostrarAlerta('Por favor, seleccione un destinatario.', 'danger');
            return;
        }
        if (monto > 0 && usuario.saldo >= monto) {
            const destinatario = usuarios.find(u => u.email === destinoEmail);
            if (destinatario) {
                usuario.saldo -= monto;
                usuario.movimientos.push(`Transferencia: -$${monto} a ${destinoEmail}`);
                destinatario.saldo += monto;
                destinatario.movimientos.push(`Transferencia: +$${monto} de ${usuario.email}`);
                sessionStorage.setItem('usuario', JSON.stringify(usuario));
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                setUsuario({ ...usuario });
                setUsuarios([...usuarios]);
                setMontoTransferencia('');
                mostrarAlerta(`Se transfirieron $${monto} a ${destinoEmail} con éxito.`, 'success');
            } else {
                mostrarAlerta('El destinatario no existe.', 'danger');
            }
        } else {
            mostrarAlerta('Fondos insuficientes o monto inválido.', 'danger');
        }
        setMontoTransferencia('');
        setDestinoEmail('');
    };

    const logout = () => {
        sessionStorage.removeItem('usuario');
        navigate('/');
    };

    const confirmarEliminacionDestinatario = (emailAEliminar) => {
        setDestinatarioAEliminar(emailAEliminar);
        setMostrarAlertaEliminar(true);
    };

    const eliminarDestinatario = () => {
        const nuevosUsuarios = usuarios.filter(u => u.email !== destinatarioAEliminar);
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
        setUsuarios(nuevosUsuarios);
        setMostrarAlertaEliminar(false);
        setAlertaEliminacion({ mostrar: true, mensaje: 'Destinatario eliminado con éxito.' }); 
        setTimeout(() => setAlertaEliminacion({ mostrar: false, mensaje: '' }), 3000); 
    };

    const cancelarEliminacionDestinatario = () => {
        setMostrarAlertaEliminar(false);
    };

    

    return (
        <div className="container">
            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo}`} role="alert">
                    {alerta.mensaje}
                </div>
            )}
           
            <h2 className="text-center">Gestión de Cuenta</h2>
            <h2 className="text-center">Hola, {usuario?.nombre || 'Usuario'} </h2>
            <h4>Mi saldo: <span id="saldo">${usuario?.saldo || 0}</span></h4>
            <div className="mt-3">
                <h5>Ingresar Dinero</h5>
                <input type="number" id="montoIngreso" className="form-control" placeholder="Monto a ingresar" value={montoIngreso} onChange={(e) => setMontoIngreso(e.target.value)} />
                <button className="btn btn-success mt-2 w-100" onClick={ingresarDinero}>Ingresar</button>
            </div>
            <div className="mt-3">
                <h5>Transferir Dinero</h5>
                <select id="usuarioDestino" className="form-select" value={destinoEmail} onChange={(e) => setDestinoEmail(e.target.value)}>
                    <option value="">Seleccionar destinatario</option>
                </select>
                <input type="number" id="montoTransferencia" className="form-control mt-2" placeholder="Monto a transferir" value={montoTransferencia} onChange={(e) => setMontoTransferencia(e.target.value)} />
                <button className="btn btn-warning mt-2 w-100" onClick={transferirDinero}>Transferir</button>
            </div>
            <h4 className="mt-4">Historial de Transacciones</h4>
            <ul id="listaTransacciones" className="list-group mt-3">
                {actualizarHistorial()}
            </ul>
            <hr />
            <p><Link to="/registrar-destinatario" className="btn btn-sm btn-success">Agregar nuevo destinatario <i className="fas fa-plus"></i></Link></p>
            <hr />
            <h4 className="mt-4">Destinatarios Registrados</h4>
            {alertaEliminacion.mostrar && (
        <div className="alert alert-success mt-3" role="alert">
            {alertaEliminacion.mensaje}
        </div>
    )}
            {mostrarAlertaEliminar && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>
                        ¿Estás seguro de que deseas eliminar este destinatario?
                        <button className="btn btn-danger btn-sm ms-2" onClick={eliminarDestinatario}>Sí</button>
                        <button className="btn btn-secondary btn-sm ms-2" onClick={cancelarEliminacionDestinatario}>No</button>
                    </div>
                </div>
            )}
            <ul id="listaDestinatarios" className="list-group mt-3">
                {actualizarDestinatarios()}
            </ul>
            <button className="btn btn-danger mt-3 w-100" onClick={logout}>Salir</button>
        </div>
    );
}

export default Transacciones;