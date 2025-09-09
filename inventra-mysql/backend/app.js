const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const inventoriesRouter = require('./routes/inventories');
const itemsRouter = require('./routes/items');
const fieldsRouter = require('./routes/fields');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/inventories', inventoriesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/fields', fieldsRouter);
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/search', require('./routes/search'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});