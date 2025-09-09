const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../../db.json');
const LOCK_FILE = `${DB_PATH}.lock`;

// Read JSON data with file locking
async function readJsonData() {
  try {
    // Check if file is locked
    while (await isFileLocked()) {
      await sleep(100); // Wait 100ms before retry
    }
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON:', error);
    throw error;
  }
}

// Write JSON data with file locking
async function writeJsonData(data) {
  try {
    // Create lock file
    await fs.writeFile(LOCK_FILE, 'locked', 'utf8');
    
    // Write data
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    
    // Remove lock file
    await fs.unlink(LOCK_FILE);
  } catch (error) {
    // Ensure lock file is removed even if write fails
    try {
      await fs.unlink(LOCK_FILE);
    } catch {}
    console.error('Error writing JSON:', error);
    throw error;
  }
}

// Check if file is currently locked
async function isFileLocked() {
  try {
    await fs.access(LOCK_FILE);
    return true;
  } catch {
    return false;
  }
}

// Utility sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  readJsonData,
  writeJsonData
};