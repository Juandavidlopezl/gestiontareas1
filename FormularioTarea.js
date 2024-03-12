import React, { useState } from 'react';

function FormularioTarea({ agregarTarea }) {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarTarea({
      descripcion,
      completada: false,
    });
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormularioTarea;
