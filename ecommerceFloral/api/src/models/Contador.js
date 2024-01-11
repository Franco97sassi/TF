const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('contador', {
        numero: {
            type: DataTypes.INTEGER,
          },
        
    }, {
        timestamps: true,
    });
};