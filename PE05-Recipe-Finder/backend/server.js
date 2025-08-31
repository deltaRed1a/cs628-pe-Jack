const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});