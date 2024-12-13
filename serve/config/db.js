const { Sequelize } = require("sequelize");

// Acceso a la base de datos
const sequelize = new Sequelize("tasklist", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("¡Conexión establecida con éxito!");
  } catch (error) {
    console.error("No se pudo establecer la conexión:", error);
  }
})();

module.exports = sequelize;
