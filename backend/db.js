const { Sequelize, DataTypes } = require('sequelize');

// Define a Sequelize instance for database connection
const db = new Sequelize('url_shortner', 'shivam', 'password', {dialect: 'postgres'});
const dbA = new Sequelize('url_shortner_a', 'shivam', 'password', {dialect: 'postgres'});
const dbB = new Sequelize('url_shortner_b', 'shivam', 'password', {dialect: 'postgres'});

// Define the URLShortener model with Sequelize DataTypes
const URLShortener = db.define('URLShortener', {
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
  access_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const URLShortenerA = dbA.define('URLShortener', {
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
  access_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const URLShortenerB = dbB.define('URLShortener', {
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
    access_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

URLShortenerA.sync();
URLShortenerB.sync();
URLShortener.sync();

module.exports = { dbA,dbB,db,URLShortener,URLShortenerA,URLShortenerB};