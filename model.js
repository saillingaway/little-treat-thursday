const { Sequelize, DataTypes } = require('sequelize');

// initialize sequalize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // File to store the SQLite database
    logging: false,               // Set to true if you want to see SQL logs
  });  

// Treat Model
const Treat = sequelize.define('Treat', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,  // Store filename or URL
      allowNull: true,
    },
    // photoURL: {
    //   type: DataTypes.STRING, // Store the URL to the photo
    //   allowNULL: true,
    // }
});

(async () => {
try {
    await sequelize.sync(); // Syncs all models to the database
    console.log("Database & tables created!");
} catch (error) {
    console.error("Error syncing database:", error);
}
})();

module.exports = { Treat };