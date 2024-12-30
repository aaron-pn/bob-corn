const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bob', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
