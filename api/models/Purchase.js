const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Purchase = sequelize.define(
  'Purchase',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'purchases',
    timestamps: true
  }
);

module.exports = Purchase;
