import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Transacciones from './components/Transacciones';
import RegistrarDestinatario from './components/RegistrarDestinatario';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                <HeaderNav />
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/transacciones" element={<Transacciones />} />
                        <Route path="/registrar-destinatario" element={<RegistrarDestinatario />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

