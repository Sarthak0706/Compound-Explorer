const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/compounds', require('./routes/compound.routes'));
app.use('/api/auth', authRoutes);

// Sync DB
db.sequelize.sync().then(() => {
  console.log("Database synced.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
