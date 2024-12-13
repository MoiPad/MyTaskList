const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')


// definicion de la tarea
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// sincronización del model con la db
(async () => {
  await sequelize.sync({ alter: true })
  console.log('Modelo Task sicnonizado con la db')
})

module.exports = Task
