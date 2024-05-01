require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const cors = require('cors');

// connect to MongoDB database
require('../src/config/config.database');


const app = express();

app.use(cors());
app.use(express.json());


app.use('/v1/api/users', userRoutes);
app.use('/v1/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
