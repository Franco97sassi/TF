const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Orden', {
    senderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deliveryType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickupTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cart: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "NO PAGADO"
    },
    idCompra: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    userId: {
      type: DataTypes.STRING,

    },
    username: {
      type: DataTypes.STRING,

    },
    description: {
      type: DataTypes.STRING,

    },
  });
};