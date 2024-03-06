
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('url_shortner', 'shivam', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const URLShortener = sequelize.define('URLShortener', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  original_url: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  short_url: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
  expired_at: {
    type: DataTypes.DATE,
  },
});

module.exports = { sequelize, URLShortener };