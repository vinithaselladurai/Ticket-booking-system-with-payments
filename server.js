require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const dietRoutes = require('./routes/diet');
const fitnessRoutes = require('./routes/fitness');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/fitness', fitnessRoutes);

// error handler (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(Server started on port ${PORT}));
}).catch(err => {
  console.error('Failed to connect DB', err);
  process.exit(1);
});
