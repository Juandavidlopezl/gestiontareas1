import React, { useState, useEffect } from 'react';
import Tarea from './components/Tarea';
import FormularioTarea from './components/FormularioTarea';

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    const response = await fetch('server.php?accion=listar');
    const data = await response.json();
    setTareas(data);
  };

  const agregarTarea = async (nuevaTarea) => {
    const response = await fetch('server.php?accion=agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaTarea),
    });

    if (response.ok) {
      fetchTareas();
    }
  };

  const eliminarTarea = async (id) => {
    const response = await fetch(`server.php?accion=eliminar&id=${id}`);

    if (response.ok) {
      fetchTareas();
    }
  };

  const editarTarea = async (tareaActualizada) => {
    const response = await fetch('server.php?accion=editar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tareaActualizada),
    });

    if (response.ok) {
      fetchTareas();
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <FormularioTarea agregarTarea={agregarTarea} />
      <ul>
        {tareas.map((tarea) => (
          <Tarea
            key={tarea.id}
            tarea={tarea}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
