import React from 'react';

function EliminarDestinatario({ email, onEliminar }) {
    return (
        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(email)}>
            <i className="fas fa-trash-alt"></i>
        </button>
    );
}

export default EliminarDestinatario;