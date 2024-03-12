<?php

require_once 'database.php';

$accion = $_GET['accion'];

switch ($accion) {
  case 'listar':
    $tareas = obtenerTareas();
    echo json_encode($tareas);
    break;
  case 'agregar':
    $nuevaTarea = json_decode(file_get_contents('php://input'));
    agregarTarea($nuevaTarea);
    break;
  case 'eliminar':
    $id = $_GET['id'];
    eliminarTarea($id);
    break;
  case 'editar':
    $tareaActualizada = json_decode(file_get_contents('php://input'));
    editarTarea($tareaActualizada);
    break;
  default:
    echo 'Acción no válida';
}

function obtenerTareas() {
  global $conn;
  $sql = 'SELECT * FROM tareas';
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function agregarTarea($nuevaTarea) {
  global $conn;
  $sql = 'INSERT INTO tareas (descripcion, completada) VALUES (:descripcion, :completada)';
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':descripcion', $nuevaTarea->descripcion);
  $stmt->bindValue(':completada', $nuevaTarea->completada);
  $stmt->execute();
}

function eliminarTarea($id) {
  global $conn;
  $sql = 'DELETE FROM tareas WHERE id = :id';
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':id', $id);
  $stmt->execute();
}

function editarTarea($tareaActualizada) {
  global $conn;
  $sql = 'UPDATE tareas SET descripcion = :descripcion, completada = :completada WHERE id = :id';
  $stmt = $conn->prepare($sql);
  $stmt->bindValue(':id', $tareaActualizada->id);
  $stmt->bindValue(':descripcion', $tareaActualizada->descripcion);
  $stmt->bindValue(':completada', $tareaActualizada->completada);
  $stmt->execute();
}

?>
