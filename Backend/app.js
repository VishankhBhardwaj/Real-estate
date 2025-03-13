const express = require('express');
const cors = require('cors');
require('./db/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const toppicksRoutes = require('./routes/toppicksRoutes');
const filteredPropertiesRoutes = require('./routes/filteredPropertiesRoutes');
// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/toppicks', toppicksRoutes);
app.use('/api/filter',filteredPropertiesRoutes);
// Base Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
app.listen(3000, () => console.log('Server is running on port 3000...'));
