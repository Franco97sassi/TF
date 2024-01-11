const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Product', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(2048),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(2048),
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.JSON), 
          allowNull: true,
        },
      });
};