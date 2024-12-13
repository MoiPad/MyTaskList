const express = require("express");
const app = express();
const cors = require("cors");
const Task = require("./models/task");
const PORT = 3002;

//middleware basicos
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Prueba en el navegador");
});
// configuración de las rutas para las API's

//API para leer(read)
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({
    attributes: ["id", "titulo", "estado", "createdAt", "updatedAt"],
  });
  res.json(tasks);
});
//API para crear(new)
app.post("/tasks", async (req, res) => {
  try {
    const { titulo, estado } = req.body;
    const newTask = await Task.create({ titulo, estado });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

//API para actulizar(update)
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, estado } = req.body;

  try {
    // Buscar si la tarea existe
    const task = await Task.findByPk(id); // metodo de sequelize para hacer busquedas por id
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" }); // Si no existe, devolver un error 404
    }
    // Actualizar la tarea
    const [updated] = await Task.update(
      { titulo, estado }, // Nuevos valores
      { where: { id } }, // Condición de búsqueda
    );

    // Verificar si se actualizó alguna fila
    if (updated) {
      const updatedTask = await Task.findByPk(id); // Obtener la tarea actualizada
      return res.json(updatedTask); // Devolver la tarea actualizada
    } else {
      return res
        .status(400)
        .json({ message: "No se pudo actualizar la tarea" }); // Si no se actualizó, devolver un error
    }
  } catch (error) {
    // Manejar cualquier error inesperado
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

//API para eliminar(delete)
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({ mensaje: "task no encontrada" });
  }

  await task.destroy();
  res.status(204).send();
});

// ruta del server
app.listen(PORT, () => {
  console.log(`Server activo en http://localhost:${3002}`);
});
