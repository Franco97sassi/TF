const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Stock', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    CodigoColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ColorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};