const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "2619",
  database: "cursos",
  port: 5432,
});

async function nuevoCurso(id) {
  try {
    const result = await pool.query(
      `INSERT INTO cursos (nombre,nivelTecnico,fechaInicio,duracion) values ('${id}') RETURNING *`
    );
    return result.rows;
  } catch (e) {
    return e;
  }
}

async function getData() {
  try {
    const result = await pool.query(`SELECT * FROM cursos`);
    return result.rows;
  } catch (e) {
    return e;
  }
}

async function editCurso(id, nuevoCurso) {
  try {
    const res = await pool.query(
      `UPDATE cursos SET nombre = '${nuevoCurso}' WHERE id = '${id}'
RETURNING *`
    );
    return res.rows;
  } catch (e) {
    console.log(e);
  }
}

async function eliminarCurso(id) {
  try {
    const result = await pool.query(`DELETE FROM cursos WHERE id ='${id}'`);
    return result.rowCount;
  } catch (e) {
    return e;
  }
}

module.exports = {
  nuevoCurso,
  getData,
  editCurso,
  eliminarCurso,
};
