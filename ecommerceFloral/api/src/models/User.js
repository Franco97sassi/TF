const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
          },
        username:{
            allowNull: false,
            unique: true,
            type:DataTypes.STRING,
            
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password:{
            allowNull: false,
            type:DataTypes.STRING,
        },
        banned:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        emailVerified:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        fidelidad:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        totalCompras:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userId:{
            type:DataTypes.STRING,
            
        },
        suscrito: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Valor predeterminado: no suscrito
        },
        tipoDeSuscripcion: {
            type: DataTypes.STRING,
            allowNull: true, // Permite valores nulos
            validate: {
                isIn: [['mensual', 'anual', null]], // Valores permitidos: 'mensual', 'anual' o null
            },
        },
        fechaRenovacion: {
            type: DataTypes.DATE,
            allowNull: true, // Permite valores nulos
        }
    }, {
        timestamps: false,
    });
};