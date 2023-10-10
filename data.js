
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres', // or 'mysql'
});

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_name: DataTypes.STRING,
  user_email: {
    type: DataTypes.STRING,
    unique: true,
  },
  user_password: DataTypes.STRING,
  user_image: DataTypes.STRING,
  total_orders: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  last_logged_in: DataTypes.DATE,
});

// Create the table if it doesn't exist
User.sync();
