const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Price', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          size: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      });
};