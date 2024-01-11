const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Color', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        codigo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
};