const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log(`Server On Puerto 3000`);
});

const {
  nuevoCurso,
  editCurso,
  eliminarCurso,
  getData,
} = require("./consultas");

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de un nuevo curso y los ingrese a la tabla cursos.
app.post("/curso", async (req, res) => {
  const { nombre } = req.body;
  const respuesta = await nuevoCurso(nombre);
  res.send(respuesta);
});
// 2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la tablacursos.
app.get("/curso", async (_, res) => {
  const respuesta = await getData();
  res.send(respuesta);
});
// 3. Crear una ruta PUT/curso que reciba un payload desde el cliente con los datos de un curso ya existente y actualice su registro en la tabla cursos.
app.put("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const respuesta = await editCurso(id, nombre);
  res.send(respuesta);
});
// 4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la ruta y elimine el registro relacionado en la tablacursos
app.delete("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await eliminarCurso(id);
  respuesta > 0
    ? res.send(`El curso de id ${id} fue eliminado con éxito`)
    : res.send("No existe un curso registrado con ese id");
});
