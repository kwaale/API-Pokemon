const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    strong:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    defense:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    speed:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    img:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
