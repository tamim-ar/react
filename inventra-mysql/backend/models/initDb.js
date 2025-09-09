const pool = require('./db');

const initializeDatabase = async () => {
  try {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        theme VARCHAR(50) DEFAULT 'light',
        language VARCHAR(50) DEFAULT 'en',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE INDEX email_idx (email)
      )
    `;

    await pool.query(createUsersTable);
    console.log('Users table created successfully');

    const createInventoriesTable = `
      CREATE TABLE IF NOT EXISTS Inventories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        image_url VARCHAR(255),
        public BOOLEAN DEFAULT false,
        creator_id INT NOT NULL,
        version INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE,
        INDEX creator_idx (creator_id),
        INDEX category_idx (category)
      )
    `;

    await pool.query(createInventoriesTable);
    console.log('Inventories table created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

initializeDatabase();