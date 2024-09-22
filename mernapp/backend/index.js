const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const cors = require('cors');
const path = require('path');

// Import routes
const createUserRoutes = require('./Routes/CreateUser');
const displayDataRoutes = require('./Routes/DisplayData');
const orderRoutes = require('./Routes/OrderData');
const someRoutes = require('./Routes/someRoute');

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' // Enable CORS for your frontend
}));

// MongoDB connection
mongoDB();

// Apply routes
app.use('/api', createUserRoutes);
app.use('/api', displayDataRoutes);
app.use('/api', orderRoutes); // Only import OrderData route once
app.use('/api', someRoutes); // Some route

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static images from uploads folder


// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
