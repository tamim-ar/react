const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const initializeDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS inventra');
    await connection.query('USE inventra');

    // Create Users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        blocked BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX email_idx (email)
      )
    `;
    await connection.query(createUsersTable);

    // Create Inventories table
    const createInventoriesTable = `
      CREATE TABLE IF NOT EXISTS Inventories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        public BOOLEAN DEFAULT false,
        creator_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creator_id) REFERENCES Users(id),
        INDEX creator_idx (creator_id)
      )
    `;
    await connection.query(createInventoriesTable);

    // Create InventoryFields table
    const createFieldsTable = `
      CREATE TABLE IF NOT EXISTS InventoryFields (
        id INT PRIMARY KEY AUTO_INCREMENT,
        inventory_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        required BOOLEAN DEFAULT false,
        order_index INT DEFAULT 0,
        FOREIGN KEY (inventory_id) REFERENCES Inventories(id) ON DELETE CASCADE,
        INDEX inventory_idx (inventory_id)
      )
    `;
    await connection.query(createFieldsTable);

    // Create Items table
    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS Items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        inventory_id INT NOT NULL,
        custom_id VARCHAR(100),
        created_by INT NOT NULL,
        version INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (inventory_id) REFERENCES Inventories(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES Users(id),
        INDEX inventory_idx (inventory_id),
        INDEX creator_idx (created_by)
      )
    `;
    await connection.query(createItemsTable);

    // Create ItemValues table
    const createValuesTable = `
      CREATE TABLE IF NOT EXISTS ItemValues (
        id INT PRIMARY KEY AUTO_INCREMENT,
        item_id INT NOT NULL,
        field_id INT NOT NULL,
        value TEXT,
        FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE CASCADE,
        FOREIGN KEY (field_id) REFERENCES InventoryFields(id) ON DELETE CASCADE,
        INDEX item_idx (item_id),
        INDEX field_idx (field_id)
      )
    `;
    await connection.query(createValuesTable);

    // Create default admin user if it doesn't exist
    const adminPassword = await bcrypt.hash('admin123', 10);
    await connection.query(`
      INSERT IGNORE INTO Users (name, email, password, role)
      VALUES ('Admin User', 'admin@example.com', ?, 'admin')
    `, [adminPassword]);

    // Create default regular user if it doesn't exist
    const userPassword = await bcrypt.hash('user123', 10);
    await connection.query(`
      INSERT IGNORE INTO Users (name, email, password, role)
      VALUES ('Regular User', 'user@example.com', ?, 'user')
    `, [userPassword]);

    console.log('Database and tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
};

initializeDatabase().catch(console.error);

module.exports = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'inventra',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});