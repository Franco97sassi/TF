const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Snack', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      });
};