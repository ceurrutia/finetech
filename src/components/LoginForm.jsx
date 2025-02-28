import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const navigate = useNavigate();

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: '', tipo: '' }), 3000);
    };

    const handleLogin = () => {
        if (!email) {
            mostrarAlerta('El email no puede estar vacío', 'danger');
            return;
        }
        if (!password) {
            mostrarAlerta('La contraseña no puede estar vacía', 'danger');
            return;
        }
        const usuario = usuarios.find(u => u.email === email && u.contraseña === password);
        if (usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            navigate('/transacciones');
        } else {
            mostrarAlerta('Email o contraseña incorrectos', 'danger');
        }
    };

    return (
        <div className="container">
            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo}`} role="alert">
                    {alerta.mensaje}
                </div>
            )}
            <h1 className="text-center">Mi Billetera Virtual</h1>
            <h4>Inicio de sesión</h4>
            <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control my-2" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary w-100" onClick={handleLogin}>Ingresar</button>
            <Link to="/register" className="btn btn-dark w-100 mt-2">Registrarse</Link>
            
        </div>
    );
}

export default Login;