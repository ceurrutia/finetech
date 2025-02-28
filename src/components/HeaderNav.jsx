import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderNav() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="./flat.png" alt="logo" width="30" height="24" className="d-inline-block align-text-top" />
                    Mi Billetera Virtual
                </Link>
               
                <div className="d-flex">
                    {usuario ? (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                        </button>
                    ) : (
                        <Link className="btn btn--primary" to="/login">
                            <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default HeaderNav;