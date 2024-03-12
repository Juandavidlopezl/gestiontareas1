import React, { useState } from 'react';

function Tarea({ tarea, eliminarTarea, editarTarea }) {
  const [completada, setCompletada] = useState(tarea.completada);

  const handleCompletar = () => {
    setCompletada(!completada);
    editarTarea({
      ...tarea,
      completada: !completada,
    });
  };

  const handleEliminar = () => {
    eliminarTarea(tarea.id);
  };

  return (
    <li className={completada ? 'completada' : ''}>
      <input
        type="checkbox"
        checked={completada}
        onChange={handleCompletar}
      />
      <p>{tarea.descripcion}</p>
      <button onClick={handleEliminar}>Eliminar</button>
    </li>
  );
};

export default Tarea;
