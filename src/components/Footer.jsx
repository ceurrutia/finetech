import React from 'react';

function Footer() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const hora = fecha.toLocaleTimeString();
    const fechaFormateada = fecha.toLocaleDateString();

    return (
        <footer className="bg-dark text-center py-3">
            <p>
                {fechaFormateada} - {hora} | Mi Billetera Virtual © {anio}
            </p>
        </footer>
    );
}

export default Footer;