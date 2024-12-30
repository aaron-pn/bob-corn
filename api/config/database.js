const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bob', 'aaronpinero', 'servir', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
