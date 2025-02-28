import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterForm() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });
    const [usuarios, setUsuarios] = useState(JSON.parse(localStorage.getItem('usuarios')) || []);
    const navigate = useNavigate();

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: '', tipo: '' }), 3000);
    };

    const handleRegister = () => {
        if (!email) {
            mostrarAlerta('El email no puede estar vacío', 'danger');
            return;
        }
        if (!password) {
            mostrarAlerta('La contraseña no puede estar vacía', 'danger');
            return;
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            mostrarAlerta('La contraseña debe tener al menos 8 caracteres y contener una mayúscula, un número y un carácter especial', 'danger');
            return;
        }
        if (usuarios.some(u => u.email === email)) {
            mostrarAlerta('El email ya está registrado', 'danger');
            return;
        }
        const nuevosUsuarios = [...usuarios, { nombre, email, contraseña: password, saldo: 0, movimientos: [] }];
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
        setUsuarios(nuevosUsuarios); // Actualiza el estado local
        mostrarAlerta('Registro exitoso', 'success');
        navigate('/login');
    };

    return (
        <div className="container">
            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo}`} role="alert">
                    {alerta.mensaje}
                </div>
            )}
            <h1 className="text-center">Mi Billetera Virtual</h1>
            <h4>Registro de nuevo usuario</h4>
            <input type="text" className="form-control my-2" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control my-2" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-success w-100" onClick={handleRegister}>Registrar</button>
            <Link to="/login" className="btn btn-dark w-100 mt-2">Iniciar sesion</Link>
        </div>
    );
}

export default RegisterForm;